import { prisma } from "@/lib/db";
import { ContentType } from "@prisma/client";

// ============================================================
// Public content queries
// ============================================================

export async function getFeaturedContent(limit = 6) {
  return prisma.content.findMany({
    where: { isPublished: true },
    orderBy: { viewCount: "desc" },
    take: limit,
    include: { creator: { select: { displayName: true, slug: true, profileImage: true } } },
  });
}

export async function getPublishedContent(params: {
  search?: string;
  type?: string;
  sort?: string;
  free?: string;
  page?: string;
}) {
  const { search, type, sort = "newest", free, page: pageStr } = params;
  const page = parseInt(pageStr || "1", 10) || 1;
  const perPage = 12;

  const where: Record<string, unknown> = { isPublished: true };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (type && ["VIDEO", "PODCAST", "LIVE_REPLAY", "EXCLUSIVE"].includes(type)) {
    where.type = type as ContentType;
  }

  if (free === "true") {
    where.isFree = true;
  }

  const orderBy = {
    newest: { publishedAt: "desc" as const },
    popular: { purchaseCount: "desc" as const },
    price_asc: { priceHUF: "asc" as const },
    price_desc: { priceHUF: "desc" as const },
  }[sort] ?? { publishedAt: "desc" as const };

  const [items, total] = await Promise.all([
    prisma.content.findMany({
      where,
      orderBy,
      take: perPage,
      skip: (page - 1) * perPage,
      include: { creator: { select: { displayName: true, slug: true, profileImage: true } } },
    }),
    prisma.content.count({ where }),
  ]);

  return { items, total, totalPages: Math.ceil(total / perPage), page };
}

export async function getContentBySlug(slug: string) {
  return prisma.content.findUnique({
    where: { slug },
    include: {
      creator: {
        select: {
          id: true,
          displayName: true,
          slug: true,
          profileImage: true,
          bio: true,
          isVerified: true,
          _count: { select: { contents: { where: { isPublished: true } } } },
        },
      },
    },
  });
}

export async function getRelatedContent(contentId: string, creatorId: string, limit = 3) {
  return prisma.content.findMany({
    where: { creatorId, isPublished: true, id: { not: contentId } },
    orderBy: { purchaseCount: "desc" },
    take: limit,
    include: { creator: { select: { displayName: true, slug: true, profileImage: true } } },
  });
}

// ============================================================
// Creator queries
// ============================================================

export async function getCreatorBySlug(slug: string) {
  return prisma.creatorProfile.findUnique({
    where: { slug },
    include: {
      user: { select: { name: true, image: true } },
      _count: { select: { contents: { where: { isPublished: true } }, liveEvents: true } },
    },
  });
}

export async function getActiveCreators(limit = 4) {
  return prisma.creatorProfile.findMany({
    where: { isActive: true },
    orderBy: { totalEarnings: "desc" },
    take: limit,
    include: {
      _count: { select: { contents: { where: { isPublished: true } } } },
    },
  });
}

export async function getCreatorContent(slug: string) {
  return prisma.content.findMany({
    where: { creator: { slug }, isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: { creator: { select: { displayName: true, slug: true, profileImage: true } } },
  });
}

// ============================================================
// Live event queries
// ============================================================

export async function getUpcomingLiveEvents(limit = 4) {
  return prisma.liveEvent.findMany({
    where: {
      status: { in: ["SCHEDULED", "LIVE"] },
    },
    orderBy: { scheduledAt: "asc" },
    take: limit,
    include: {
      creator: { select: { displayName: true, slug: true, profileImage: true } },
      _count: { select: { products: true } },
    },
  });
}

export async function getLiveEvents() {
  return prisma.liveEvent.findMany({
    orderBy: { scheduledAt: "asc" },
    include: {
      creator: { select: { displayName: true, slug: true, profileImage: true } },
      _count: { select: { products: true } },
    },
  });
}

// ============================================================
// User / buyer queries
// ============================================================

export async function hasUserPurchased(userId: string, contentId: string) {
  const purchase = await prisma.purchase.findUnique({
    where: { userId_contentId: { userId, contentId } },
  });
  return !!purchase;
}

export async function getUserPurchases(userId: string) {
  return prisma.purchase.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { createdAt: "desc" },
    include: {
      content: {
        include: { creator: { select: { displayName: true, slug: true } } },
      },
    },
  });
}

export async function getUserWalletTransactions(userId: string) {
  return prisma.walletTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserWalletBalance(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { walletBalanceHUF: true },
  });
  return user?.walletBalanceHUF ?? 0;
}

// ============================================================
// Creator dashboard queries
// ============================================================

export async function getCreatorProfile(userId: string) {
  return prisma.creatorProfile.findUnique({
    where: { userId },
  });
}

export async function getCreatorDashboardStats(creatorProfileId: string) {
  const [profile, contentCount, totalViews, recentContent] = await Promise.all([
    prisma.creatorProfile.findUnique({
      where: { id: creatorProfileId },
      select: { totalEarnings: true, availableBalance: true },
    }),
    prisma.content.count({ where: { creatorId: creatorProfileId } }),
    prisma.content.aggregate({
      where: { creatorId: creatorProfileId },
      _sum: { viewCount: true },
    }),
    prisma.content.findMany({
      where: { creatorId: creatorProfileId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    totalEarnings: profile?.totalEarnings ?? 0,
    availableBalance: profile?.availableBalance ?? 0,
    contentCount,
    totalViews: totalViews._sum.viewCount ?? 0,
    recentContent,
  };
}

export async function getCreatorContentList(creatorProfileId: string) {
  return prisma.content.findMany({
    where: { creatorId: creatorProfileId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCreatorEarnings(creatorProfileId: string) {
  return prisma.purchase.findMany({
    where: {
      content: { creatorId: creatorProfileId },
      status: "COMPLETED",
    },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      content: { select: { title: true, slug: true } },
      user: { select: { name: true } },
    },
  });
}

// ============================================================
// Stats queries (for homepage hero)
// ============================================================

export async function getPlatformStats() {
  const [creators, contents, users] = await Promise.all([
    prisma.creatorProfile.count({ where: { isActive: true } }),
    prisma.content.count({ where: { isPublished: true } }),
    prisma.user.count(),
  ]);
  return { creators, contents, users };
}

export async function getLiveNowCount() {
  return prisma.liveEvent.count({ where: { status: "LIVE" } });
}
