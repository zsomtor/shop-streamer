import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Test DB connection
    await prisma.$queryRaw`SELECT 1`;

    // Check if data already exists
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return NextResponse.json({
        status: "ok",
        message: `Adatbázis már inicializálva. ${userCount} felhasználó található.`,
        seeded: false,
      });
    }

    // Seed the database
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@shopstream.hu",
        name: "Admin",
        role: "ADMIN",
        walletBalanceHUF: 50000,
      },
    });

    const bazuUser = await prisma.user.create({
      data: { email: "bazu@shopstream.hu", name: "BAZU", role: "CREATOR", walletBalanceHUF: 0 },
    });

    const sneakerUser = await prisma.user.create({
      data: { email: "sneaker@shopstream.hu", name: "Sneaker Király", role: "CREATOR", walletBalanceHUF: 0 },
    });

    const fitUser = await prisma.user.create({
      data: { email: "fitmarcsi@shopstream.hu", name: "Fit Marcsi", role: "CREATOR", walletBalanceHUF: 0 },
    });

    const techUser = await prisma.user.create({
      data: { email: "techtomi@shopstream.hu", name: "Tech Tomi", role: "CREATOR", walletBalanceHUF: 0 },
    });

    const beautyUser = await prisma.user.create({
      data: { email: "szepseg@shopstream.hu", name: "Szépség Szalon", role: "CREATOR", walletBalanceHUF: 0 },
    });

    const buyerUser = await prisma.user.create({
      data: { email: "vasarlo@example.com", name: "Teszt Vásárló", role: "BUYER", walletBalanceHUF: 12500 },
    });

    // Creator profiles
    const bazuProfile = await prisma.creatorProfile.create({
      data: {
        userId: bazuUser.id,
        displayName: "BAZU",
        slug: "bazu",
        bio: "Magyarország vezető üzleti média platformja. Podcastok, interjúk, videós tartalmak vállalkozókkal.",
        isVerified: true,
        totalEarnings: 1245800,
        availableBalance: 384200,
      },
    });

    const sneakerProfile = await prisma.creatorProfile.create({
      data: {
        userId: sneakerUser.id,
        displayName: "Sneaker Király",
        slug: "sneaker-kiraly",
        bio: "Cipő viszonteladó és sneaker kultúra rajongó. Élő kiárusításokon a legjobb árakon.",
        isVerified: true,
        totalEarnings: 892400,
        availableBalance: 156300,
      },
    });

    const fitProfile = await prisma.creatorProfile.create({
      data: {
        userId: fitUser.id,
        displayName: "FitMarcsi",
        slug: "fitmarcsi",
        bio: "Okleveles személyi edző és táplálkozási tanácsadó.",
        totalEarnings: 456200,
        availableBalance: 89400,
      },
    });

    const techProfile = await prisma.creatorProfile.create({
      data: {
        userId: techUser.id,
        displayName: "TechTomi",
        slug: "techtomi",
        bio: "Technológiai újdonságok, gadget tesztek és őszinte vélemények.",
        totalEarnings: 234100,
        availableBalance: 67800,
      },
    });

    const beautyProfile = await prisma.creatorProfile.create({
      data: {
        userId: beautyUser.id,
        displayName: "Szépség Szalon",
        slug: "szepseg-szalon",
        bio: "Kozmetikus és szépségápolási szakértő. Élő bemutatók a legjobb termékekről.",
        isVerified: true,
        totalEarnings: 678900,
        availableBalance: 234500,
      },
    });

    // Content
    await prisma.content.createMany({
      data: [
        {
          creatorId: bazuProfile.id,
          title: "Exkluzív: Polgár Judit interjú — A teljes, vágatlan beszélgetés",
          description: "Egyedülálló, 90 perces interjú Polgár Judittal.",
          slug: "polgar-judit-exkluziv-interju",
          type: "VIDEO",
          priceHUF: 990,
          duration: 5400,
          isPublished: true,
          purchaseCount: 847,
          viewCount: 12340,
          publishedAt: new Date("2025-11-15"),
        },
        {
          creatorId: bazuProfile.id,
          title: "Hogyan építettem 100 milliós céget 23 évesen",
          description: "Kovács Bence, a RapidGrow alapítója meséli el a történetét.",
          slug: "100-millios-ceg-23-evesen",
          type: "PODCAST",
          priceHUF: 690,
          duration: 3600,
          isPublished: true,
          purchaseCount: 1234,
          viewCount: 18920,
          publishedAt: new Date("2025-12-01"),
        },
        {
          creatorId: bazuProfile.id,
          title: "BAZU Podcast #127 — A magyar startup ökoszisztéma 2026-ban",
          slug: "bazu-podcast-127-startup-okoszisztema",
          type: "PODCAST",
          priceHUF: 0,
          duration: 4200,
          isPublished: true,
          isFree: true,
          viewCount: 34560,
          publishedAt: new Date("2026-01-10"),
        },
        {
          creatorId: sneakerProfile.id,
          title: "Nike Dunk Low unboxing + árazási tippek viszonteladóknak",
          slug: "nike-dunk-low-unboxing-arazas",
          type: "VIDEO",
          priceHUF: 490,
          duration: 1800,
          isPublished: true,
          purchaseCount: 567,
          viewCount: 8920,
          publishedAt: new Date("2025-12-15"),
        },
        {
          creatorId: sneakerProfile.id,
          title: "A sneaker viszonteladás alapjai — Kezdő csomag",
          slug: "sneaker-viszonteladas-alapjai",
          type: "EXCLUSIVE",
          priceHUF: 1990,
          duration: 2700,
          isPublished: true,
          purchaseCount: 234,
          viewCount: 3450,
          publishedAt: new Date("2025-10-20"),
        },
        {
          creatorId: fitProfile.id,
          title: "30 napos otthoni edzésterv — Teljes videósorozat",
          slug: "30-napos-otthoni-edzesterv",
          type: "VIDEO",
          priceHUF: 1490,
          duration: 54000,
          isPublished: true,
          purchaseCount: 892,
          viewCount: 15670,
          publishedAt: new Date("2025-09-01"),
        },
        {
          creatorId: fitProfile.id,
          title: "Egészséges meal prep receptek — Egy hét előre",
          slug: "meal-prep-egy-het-elore",
          type: "VIDEO",
          priceHUF: 790,
          duration: 2400,
          isPublished: true,
          purchaseCount: 445,
          viewCount: 6780,
          publishedAt: new Date("2025-11-20"),
        },
        {
          creatorId: techProfile.id,
          title: "iPhone 17 Pro vs Samsung S26 Ultra — Melyiket válaszd?",
          slug: "iphone-17-vs-samsung-s26",
          type: "VIDEO",
          priceHUF: 390,
          duration: 1500,
          isPublished: true,
          purchaseCount: 678,
          viewCount: 23450,
          publishedAt: new Date("2026-01-05"),
        },
        {
          creatorId: techProfile.id,
          title: "Legjobb laptop 200 ezer alatt 2026-ban — Top 5",
          slug: "legjobb-laptop-200-ezer-alatt",
          type: "VIDEO",
          priceHUF: 0,
          duration: 1200,
          isPublished: true,
          isFree: true,
          viewCount: 45230,
          publishedAt: new Date("2026-01-20"),
        },
        {
          creatorId: beautyProfile.id,
          title: "Koreai bőrápolási rutin — 10 lépéses útmutató",
          slug: "koreai-borapolasi-rutin",
          type: "VIDEO",
          priceHUF: 590,
          duration: 2100,
          isPublished: true,
          purchaseCount: 1123,
          viewCount: 19870,
          publishedAt: new Date("2025-12-10"),
        },
      ],
    });

    // Live events
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const threeDays = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const sneakerEvent = await prisma.liveEvent.create({
      data: {
        creatorId: sneakerProfile.id,
        title: "Sneaker Kiárusítás — 50% kedvezmény!",
        description: "Heti élő kiárusítás! Nike, Adidas, New Balance cipők fél áron.",
        scheduledAt: tomorrow,
        type: "SHOPPING",
      },
    });

    await prisma.liveEvent.create({
      data: {
        creatorId: bazuProfile.id,
        title: "BAZU LIVE: Kérdezz-felelek vállalkozókkal",
        description: "Élő Q&A session meghívott vállalkozó vendégekkel.",
        scheduledAt: nextWeek,
        type: "QA",
      },
    });

    const beautyEvent = await prisma.liveEvent.create({
      data: {
        creatorId: beautyProfile.id,
        title: "Tavaszi sminktrendek — Élő bemutató + akciós termékek",
        description: "2026-os tavaszi sminktrendek bemutatója akciós termékekkel.",
        scheduledAt: threeDays,
        type: "SHOPPING",
      },
    });

    // Live products
    await prisma.liveProduct.createMany({
      data: [
        { liveEventId: sneakerEvent.id, name: "Nike Dunk Low Panda", originalPriceHUF: 44990, livePriceHUF: 22490, stockQuantity: 15, isActive: true, displayOrder: 1 },
        { liveEventId: sneakerEvent.id, name: "Adidas Samba OG", originalPriceHUF: 39990, livePriceHUF: 19990, stockQuantity: 20, isActive: true, displayOrder: 2 },
        { liveEventId: sneakerEvent.id, name: "New Balance 550", originalPriceHUF: 42990, livePriceHUF: 24990, stockQuantity: 8, displayOrder: 3 },
        { liveEventId: sneakerEvent.id, name: "Nike Air Force 1 '07", originalPriceHUF: 37990, livePriceHUF: 18990, stockQuantity: 25, displayOrder: 4 },
        { liveEventId: beautyEvent.id, name: "COSRX Advanced Snail 96 Mucin Power Essence", originalPriceHUF: 6990, livePriceHUF: 3990, stockQuantity: 30, isActive: true, displayOrder: 1 },
        { liveEventId: beautyEvent.id, name: "Innisfree Green Tea Seed Serum", originalPriceHUF: 8490, livePriceHUF: 4990, stockQuantity: 20, isActive: true, displayOrder: 2 },
      ],
    });

    return NextResponse.json({
      status: "ok",
      message: "Adatbázis sikeresen inicializálva!",
      seeded: true,
      data: {
        users: 7,
        creators: 5,
        content: 10,
        liveEvents: 3,
        liveProducts: 6,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Ismeretlen hiba";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
