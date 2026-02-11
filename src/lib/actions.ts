"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ============================================================
// Purchase content
// ============================================================

export async function purchaseContent(contentId: string): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Nem vagy bejelentkezve." };

  const userId = session.user.id;

  const content = await prisma.content.findUnique({
    where: { id: contentId },
    include: { creator: true },
  });
  if (!content || !content.isPublished) return { error: "A tartalom nem található." };
  if (content.isFree) return { error: "Ez a tartalom ingyenes." };

  // Check if already purchased
  const existing = await prisma.purchase.findUnique({
    where: { userId_contentId: { userId, contentId } },
  });
  if (existing) return { error: "Már megvásároltad ezt a tartalmat." };

  // Check wallet balance
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.walletBalanceHUF < content.priceHUF) {
    return { error: "Nincs elegendő egyenleg. Töltsd fel a tárcádat!" };
  }

  // Calculate fees
  const commissionRate = Number(content.creator.commissionRate);
  const creatorEarningHUF = Math.floor(content.priceHUF * commissionRate);
  const platformFeeHUF = content.priceHUF - creatorEarningHUF;

  try {
    await prisma.$transaction([
      // Deduct from buyer wallet
      prisma.user.update({
        where: { id: userId },
        data: { walletBalanceHUF: { decrement: content.priceHUF } },
      }),
      // Create purchase record
      prisma.purchase.create({
        data: {
          userId,
          contentId,
          amountHUF: content.priceHUF,
          platformFeeHUF,
          creatorEarningHUF,
          paymentMethod: "PLATFORM_WALLET",
          status: "COMPLETED",
        },
      }),
      // Create wallet transaction for buyer
      prisma.walletTransaction.create({
        data: {
          userId,
          type: "PURCHASE",
          amountHUF: -content.priceHUF,
          balanceBefore: user.walletBalanceHUF,
          balanceAfter: user.walletBalanceHUF - content.priceHUF,
        },
      }),
      // Increment purchase count
      prisma.content.update({
        where: { id: contentId },
        data: { purchaseCount: { increment: 1 } },
      }),
      // Add earnings to creator
      prisma.creatorProfile.update({
        where: { id: content.creatorId },
        data: {
          totalEarnings: { increment: creatorEarningHUF },
          availableBalance: { increment: creatorEarningHUF },
        },
      }),
    ]);
  } catch {
    return { error: "Hiba történt a vásárlás során. Próbáld újra!" };
  }

  revalidatePath(`/content/${content.slug}`);
  revalidatePath("/wallet");
  revalidatePath("/purchases");
  revalidatePath("/dashboard");

  return { success: true };
}

// ============================================================
// Wallet top-up (mock)
// ============================================================

const VALID_TOP_UP_AMOUNTS = [1000, 2000, 5000, 10000, 20000];

export async function topUpWallet(amount: number): Promise<{ error?: string; success?: boolean; newBalance?: number }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Nem vagy bejelentkezve." };

  if (!VALID_TOP_UP_AMOUNTS.includes(amount)) {
    return { error: "Érvénytelen összeg." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { error: "Felhasználó nem található." };

  await prisma.$transaction([
    prisma.user.update({
      where: { id: session.user.id },
      data: { walletBalanceHUF: { increment: amount } },
    }),
    prisma.walletTransaction.create({
      data: {
        userId: session.user.id,
        type: "TOP_UP",
        amountHUF: amount,
        balanceBefore: user.walletBalanceHUF,
        balanceAfter: user.walletBalanceHUF + amount,
      },
    }),
  ]);

  revalidatePath("/wallet");
  revalidatePath("/dashboard");

  return { success: true, newBalance: user.walletBalanceHUF + amount };
}

// ============================================================
// Create content (creator)
// ============================================================

export async function createContent(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Nem vagy bejelentkezve." };
  if (session.user.role !== "CREATOR" && session.user.role !== "ADMIN") {
    return { error: "Nincs jogosultságod." };
  }

  const creatorProfile = await prisma.creatorProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!creatorProfile) return { error: "Nincs alkotói profil." };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const priceHUF = parseInt(formData.get("price") as string, 10) || 0;
  const videoUrl = formData.get("videoUrl") as string;
  const thumbnailUrl = formData.get("thumbnailUrl") as string;

  if (!title?.trim()) return { error: "A cím megadása kötelező." };
  if (!type) return { error: "A típus megadása kötelező." };

  // Generate slug from title
  const slug =
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Date.now().toString(36);

  await prisma.content.create({
    data: {
      creatorId: creatorProfile.id,
      title: title.trim(),
      description: description?.trim() || null,
      slug,
      type: type as "VIDEO" | "PODCAST" | "EXCLUSIVE",
      priceHUF,
      isFree: priceHUF === 0,
      videoUrl: videoUrl || null,
      thumbnailUrl: thumbnailUrl || null,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  revalidatePath("/creator-dashboard/content");
  revalidatePath("/explore");
  redirect("/creator-dashboard/content");
}

// ============================================================
// Toggle content published status
// ============================================================

export async function toggleContentPublished(contentId: string): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Nem vagy bejelentkezve." };

  const content = await prisma.content.findUnique({
    where: { id: contentId },
    include: { creator: true },
  });

  if (!content) return { error: "Tartalom nem található." };
  if (content.creator.userId !== session.user.id && session.user.role !== "ADMIN") {
    return { error: "Nincs jogosultságod." };
  }

  await prisma.content.update({
    where: { id: contentId },
    data: {
      isPublished: !content.isPublished,
      publishedAt: !content.isPublished ? new Date() : content.publishedAt,
    },
  });

  revalidatePath("/creator-dashboard/content");
  revalidatePath("/explore");
  return { success: true };
}
