import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const CREATE_TABLES_SQL = `
-- Enums
DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('BUYER', 'CREATOR', 'ADMIN');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "ContentType" AS ENUM ('VIDEO', 'PODCAST', 'LIVE_REPLAY', 'EXCLUSIVE');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED', 'FAILED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "PaymentMethod" AS ENUM ('BARION_WALLET', 'BARION_CARD', 'SIMPLEPAY', 'PLATFORM_WALLET');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "LiveEventStatus" AS ENUM ('SCHEDULED', 'LIVE', 'ENDED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "LiveEventType" AS ENUM ('SHOPPING', 'EXCLUSIVE_CONTENT', 'QA', 'OTHER');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "LiveOrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "WalletTransactionType" AS ENUM ('TOP_UP', 'PURCHASE', 'REFUND', 'CREATOR_PAYOUT');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- User
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'BUYER',
    "barionWalletId" TEXT,
    "walletBalanceHUF" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- Account
CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- Session
CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");

-- VerificationToken
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreatorProfile
CREATE TABLE IF NOT EXISTS "CreatorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "bio" TEXT,
    "profileImage" TEXT,
    "coverImage" TEXT,
    "commissionRate" DECIMAL(3,2) NOT NULL DEFAULT 0.85,
    "totalEarnings" INTEGER NOT NULL DEFAULT 0,
    "availableBalance" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CreatorProfile_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "CreatorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "CreatorProfile_userId_key" ON "CreatorProfile"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "CreatorProfile_slug_key" ON "CreatorProfile"("slug");

-- Content
CREATE TABLE IF NOT EXISTS "Content" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'VIDEO',
    "priceHUF" INTEGER NOT NULL,
    "thumbnailUrl" TEXT,
    "videoUrl" TEXT,
    "duration" INTEGER,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "purchaseCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Content_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Content_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "CreatorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Content_slug_key" ON "Content"("slug");

-- Purchase
CREATE TABLE IF NOT EXISTS "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "amountHUF" INTEGER NOT NULL,
    "platformFeeHUF" INTEGER NOT NULL,
    "creatorEarningHUF" INTEGER NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'PLATFORM_WALLET',
    "barionTransactionId" TEXT,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Purchase_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Purchase_userId_contentId_key" ON "Purchase"("userId", "contentId");

-- LiveEvent
CREATE TABLE IF NOT EXISTS "LiveEvent" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnailUrl" TEXT,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "status" "LiveEventStatus" NOT NULL DEFAULT 'SCHEDULED',
    "streamUrl" TEXT,
    "playbackUrl" TEXT,
    "viewerCount" INTEGER NOT NULL DEFAULT 0,
    "peakViewerCount" INTEGER NOT NULL DEFAULT 0,
    "type" "LiveEventType" NOT NULL DEFAULT 'SHOPPING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LiveEvent_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "LiveEvent_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "CreatorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- LiveProduct
CREATE TABLE IF NOT EXISTS "LiveProduct" (
    "id" TEXT NOT NULL,
    "liveEventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "originalPriceHUF" INTEGER NOT NULL,
    "livePriceHUF" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "soldQuantity" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LiveProduct_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "LiveProduct_liveEventId_fkey" FOREIGN KEY ("liveEventId") REFERENCES "LiveEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- LiveOrder
CREATE TABLE IF NOT EXISTS "LiveOrder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "liveEventId" TEXT NOT NULL,
    "liveProductId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalHUF" INTEGER NOT NULL,
    "platformFeeHUF" INTEGER NOT NULL,
    "status" "LiveOrderStatus" NOT NULL DEFAULT 'PENDING',
    "shippingAddress" JSONB,
    "barionTransactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LiveOrder_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "LiveOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LiveOrder_liveEventId_fkey" FOREIGN KEY ("liveEventId") REFERENCES "LiveEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LiveOrder_liveProductId_fkey" FOREIGN KEY ("liveProductId") REFERENCES "LiveProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- WalletTransaction
CREATE TABLE IF NOT EXISTS "WalletTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "WalletTransactionType" NOT NULL,
    "amountHUF" INTEGER NOT NULL,
    "balanceBefore" INTEGER NOT NULL,
    "balanceAfter" INTEGER NOT NULL,
    "relatedPurchaseId" TEXT,
    "relatedLiveOrderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WalletTransaction_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "WalletTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
`;

export async function GET() {
  try {
    // Step 1: Create tables
    await prisma.$executeRawUnsafe(CREATE_TABLES_SQL);

    // Step 2: Check if already seeded
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return NextResponse.json({
        status: "ok",
        message: `Adatbázis már inicializálva. ${userCount} felhasználó található.`,
        seeded: false,
      });
    }

    // Step 3: Seed data
    const adminUser = await prisma.user.create({
      data: { email: "admin@shopstream.hu", name: "Admin", role: "ADMIN", walletBalanceHUF: 50000 },
    });

    const bazuUser = await prisma.user.create({
      data: { email: "bazu@shopstream.hu", name: "BAZU", role: "CREATOR" },
    });

    const sneakerUser = await prisma.user.create({
      data: { email: "sneaker@shopstream.hu", name: "Sneaker Király", role: "CREATOR" },
    });

    const fitUser = await prisma.user.create({
      data: { email: "fitmarcsi@shopstream.hu", name: "Fit Marcsi", role: "CREATOR" },
    });

    const techUser = await prisma.user.create({
      data: { email: "techtomi@shopstream.hu", name: "Tech Tomi", role: "CREATOR" },
    });

    const beautyUser = await prisma.user.create({
      data: { email: "szepseg@shopstream.hu", name: "Szépség Szalon", role: "CREATOR" },
    });

    await prisma.user.create({
      data: { email: "vasarlo@example.com", name: "Teszt Vásárló", role: "BUYER", walletBalanceHUF: 12500 },
    });

    const bazuProfile = await prisma.creatorProfile.create({
      data: {
        userId: bazuUser.id, displayName: "BAZU", slug: "bazu",
        bio: "Magyarország vezető üzleti média platformja. Podcastok, interjúk, videós tartalmak vállalkozókkal.",
        isVerified: true, totalEarnings: 1245800, availableBalance: 384200,
      },
    });

    const sneakerProfile = await prisma.creatorProfile.create({
      data: {
        userId: sneakerUser.id, displayName: "Sneaker Király", slug: "sneaker-kiraly",
        bio: "Cipő viszonteladó és sneaker kultúra rajongó. Élő kiárusításokon a legjobb árakon.",
        isVerified: true, totalEarnings: 892400, availableBalance: 156300,
      },
    });

    const fitProfile = await prisma.creatorProfile.create({
      data: {
        userId: fitUser.id, displayName: "FitMarcsi", slug: "fitmarcsi",
        bio: "Okleveles személyi edző és táplálkozási tanácsadó.",
        totalEarnings: 456200, availableBalance: 89400,
      },
    });

    const techProfile = await prisma.creatorProfile.create({
      data: {
        userId: techUser.id, displayName: "TechTomi", slug: "techtomi",
        bio: "Technológiai újdonságok, gadget tesztek és őszinte vélemények.",
        totalEarnings: 234100, availableBalance: 67800,
      },
    });

    const beautyProfile = await prisma.creatorProfile.create({
      data: {
        userId: beautyUser.id, displayName: "Szépség Szalon", slug: "szepseg-szalon",
        bio: "Kozmetikus és szépségápolási szakértő. Élő bemutatók a legjobb termékekről.",
        isVerified: true, totalEarnings: 678900, availableBalance: 234500,
      },
    });

    await prisma.content.createMany({
      data: [
        { creatorId: bazuProfile.id, title: "Exkluzív: Polgár Judit interjú — A teljes, vágatlan beszélgetés", description: "Egyedülálló, 90 perces interjú Polgár Judittal.", slug: "polgar-judit-exkluziv-interju", type: "VIDEO", priceHUF: 990, duration: 5400, isPublished: true, purchaseCount: 847, viewCount: 12340, publishedAt: new Date("2025-11-15") },
        { creatorId: bazuProfile.id, title: "Hogyan építettem 100 milliós céget 23 évesen", description: "Kovács Bence, a RapidGrow alapítója meséli el a történetét.", slug: "100-millios-ceg-23-evesen", type: "PODCAST", priceHUF: 690, duration: 3600, isPublished: true, purchaseCount: 1234, viewCount: 18920, publishedAt: new Date("2025-12-01") },
        { creatorId: bazuProfile.id, title: "BAZU Podcast #127 — A magyar startup ökoszisztéma 2026-ban", slug: "bazu-podcast-127-startup-okoszisztema", type: "PODCAST", priceHUF: 0, duration: 4200, isPublished: true, isFree: true, viewCount: 34560, publishedAt: new Date("2026-01-10") },
        { creatorId: sneakerProfile.id, title: "Nike Dunk Low unboxing + árazási tippek viszonteladóknak", slug: "nike-dunk-low-unboxing-arazas", type: "VIDEO", priceHUF: 490, duration: 1800, isPublished: true, purchaseCount: 567, viewCount: 8920, publishedAt: new Date("2025-12-15") },
        { creatorId: sneakerProfile.id, title: "A sneaker viszonteladás alapjai — Kezdő csomag", slug: "sneaker-viszonteladas-alapjai", type: "EXCLUSIVE", priceHUF: 1990, duration: 2700, isPublished: true, purchaseCount: 234, viewCount: 3450, publishedAt: new Date("2025-10-20") },
        { creatorId: fitProfile.id, title: "30 napos otthoni edzésterv — Teljes videósorozat", slug: "30-napos-otthoni-edzesterv", type: "VIDEO", priceHUF: 1490, duration: 54000, isPublished: true, purchaseCount: 892, viewCount: 15670, publishedAt: new Date("2025-09-01") },
        { creatorId: fitProfile.id, title: "Egészséges meal prep receptek — Egy hét előre", slug: "meal-prep-egy-het-elore", type: "VIDEO", priceHUF: 790, duration: 2400, isPublished: true, purchaseCount: 445, viewCount: 6780, publishedAt: new Date("2025-11-20") },
        { creatorId: techProfile.id, title: "iPhone 17 Pro vs Samsung S26 Ultra — Melyiket válaszd?", slug: "iphone-17-vs-samsung-s26", type: "VIDEO", priceHUF: 390, duration: 1500, isPublished: true, purchaseCount: 678, viewCount: 23450, publishedAt: new Date("2026-01-05") },
        { creatorId: techProfile.id, title: "Legjobb laptop 200 ezer alatt 2026-ban — Top 5", slug: "legjobb-laptop-200-ezer-alatt", type: "VIDEO", priceHUF: 0, duration: 1200, isPublished: true, isFree: true, viewCount: 45230, publishedAt: new Date("2026-01-20") },
        { creatorId: beautyProfile.id, title: "Koreai bőrápolási rutin — 10 lépéses útmutató", slug: "koreai-borapolasi-rutin", type: "VIDEO", priceHUF: 590, duration: 2100, isPublished: true, purchaseCount: 1123, viewCount: 19870, publishedAt: new Date("2025-12-10") },
      ],
    });

    const tomorrow = new Date(Date.now() + 86400000);
    const nextWeek = new Date(Date.now() + 604800000);
    const threeDays = new Date(Date.now() + 259200000);

    const sneakerEvent = await prisma.liveEvent.create({
      data: { creatorId: sneakerProfile.id, title: "Sneaker Kiárusítás — 50% kedvezmény!", description: "Heti élő kiárusítás! Nike, Adidas, New Balance cipők fél áron.", scheduledAt: tomorrow, type: "SHOPPING" },
    });

    await prisma.liveEvent.create({
      data: { creatorId: bazuProfile.id, title: "BAZU LIVE: Kérdezz-felelek vállalkozókkal", description: "Élő Q&A session meghívott vállalkozó vendégekkel.", scheduledAt: nextWeek, type: "QA" },
    });

    const beautyEvent = await prisma.liveEvent.create({
      data: { creatorId: beautyProfile.id, title: "Tavaszi sminktrendek — Élő bemutató + akciós termékek", description: "2026-os tavaszi sminktrendek bemutatója akciós termékekkel.", scheduledAt: threeDays, type: "SHOPPING" },
    });

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
      message: "Adatbázis sikeresen létrehozva és feltöltve!",
      seeded: true,
      data: { users: 7, creators: 5, content: 10, liveEvents: 3, liveProducts: 6 },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Ismeretlen hiba";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
