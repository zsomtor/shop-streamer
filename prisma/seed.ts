import { PrismaClient, UserRole, ContentType, LiveEventStatus, LiveEventType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.walletTransaction.deleteMany();
  await prisma.liveOrder.deleteMany();
  await prisma.liveProduct.deleteMany();
  await prisma.liveEvent.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.content.deleteMany();
  await prisma.creatorProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  // ============================================================
  // Users
  // ============================================================

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@shopstream.hu",
      name: "Admin",
      role: UserRole.ADMIN,
      walletBalanceHUF: 50000,
    },
  });

  const bazuUser = await prisma.user.create({
    data: {
      email: "bazu@shopstream.hu",
      name: "BAZU",
      role: UserRole.CREATOR,
      walletBalanceHUF: 0,
    },
  });

  const sneakerUser = await prisma.user.create({
    data: {
      email: "sneaker@shopstream.hu",
      name: "Sneaker Király",
      role: UserRole.CREATOR,
      walletBalanceHUF: 0,
    },
  });

  const fitUser = await prisma.user.create({
    data: {
      email: "fitmarcsi@shopstream.hu",
      name: "Fit Marcsi",
      role: UserRole.CREATOR,
      walletBalanceHUF: 0,
    },
  });

  const techUser = await prisma.user.create({
    data: {
      email: "techtomi@shopstream.hu",
      name: "Tech Tomi",
      role: UserRole.CREATOR,
      walletBalanceHUF: 0,
    },
  });

  const beautyUser = await prisma.user.create({
    data: {
      email: "szepseg@shopstream.hu",
      name: "Szépség Szalon",
      role: UserRole.CREATOR,
      walletBalanceHUF: 0,
    },
  });

  const buyerUser = await prisma.user.create({
    data: {
      email: "vasarlo@example.com",
      name: "Teszt Vásárló",
      role: UserRole.BUYER,
      walletBalanceHUF: 12500,
    },
  });

  // ============================================================
  // Creator Profiles
  // ============================================================

  const bazuProfile = await prisma.creatorProfile.create({
    data: {
      userId: bazuUser.id,
      displayName: "BAZU",
      slug: "bazu",
      bio: "Magyarország vezető üzleti média platformja. Podcastok, interjúk, videós tartalmak vállalkozókkal és üzleti vezetőkkel. Ismerd meg a sikeres magyar vállalkozók történeteit.",
      isVerified: true,
      isActive: true,
      totalEarnings: 1245800,
      availableBalance: 384200,
    },
  });

  const sneakerProfile = await prisma.creatorProfile.create({
    data: {
      userId: sneakerUser.id,
      displayName: "Sneaker Király",
      slug: "sneaker-kiraly",
      bio: "Cipő viszonteladó és sneaker kultúra rajongó. Élő kiárusításokon a legjobb árakon szerezheted be a legmenőbb cipőket. Hetente új drop!",
      isVerified: true,
      isActive: true,
      totalEarnings: 892400,
      availableBalance: 156300,
    },
  });

  const fitProfile = await prisma.creatorProfile.create({
    data: {
      userId: fitUser.id,
      displayName: "FitMarcsi",
      slug: "fitmarcsi",
      bio: "Okleveles személyi edző és táplálkozási tanácsadó. Segítek, hogy otthonról is elérd az álom alakod. Heti edzéstervek, receptek és motiváció!",
      isVerified: false,
      isActive: true,
      totalEarnings: 456200,
      availableBalance: 89400,
    },
  });

  const techProfile = await prisma.creatorProfile.create({
    data: {
      userId: techUser.id,
      displayName: "TechTomi",
      slug: "techtomi",
      bio: "Technológiai újdonságok, gadget tesztek és őszinte vélemények. Ha tech-et keresel, itt megtalálod a választ. iPhone, Android, laptop — mindent tesztelek!",
      isVerified: false,
      isActive: true,
      totalEarnings: 234100,
      availableBalance: 67800,
    },
  });

  const beautyProfile = await prisma.creatorProfile.create({
    data: {
      userId: beautyUser.id,
      displayName: "Szépség Szalon",
      slug: "szepseg-szalon",
      bio: "Kozmetikus és szépségápolási szakértő. Élő bemutatókban mutatom meg a legjobb termékeket és technikákat. Akciós termékek minden élő közvetítésben!",
      isVerified: true,
      isActive: true,
      totalEarnings: 678900,
      availableBalance: 234500,
    },
  });

  // ============================================================
  // Content
  // ============================================================

  const contents = await Promise.all([
    prisma.content.create({
      data: {
        creatorId: bazuProfile.id,
        title: "Exkluzív: Polgár Judit interjú — A teljes, vágatlan beszélgetés",
        description:
          "Egyedülálló, 90 perces interjú Polgár Judittal, a világ valaha volt legjobb női sakkozójával. Beszélgetünk a neveltetéséről, a siker titkairól, és arról hogyan alkalmazhatod a sakk stratégiákat az üzleti életben.",
        slug: "polgar-judit-exkluziv-interju",
        type: ContentType.VIDEO,
        priceHUF: 990,
        duration: 5400,
        videoUrl: "https://www.youtube.com/watch?v=MT4VQqx_cjE",
        thumbnailUrl: "https://img.youtube.com/vi/MT4VQqx_cjE/hqdefault.jpg",
        isPublished: true,
        isFree: false,
        purchaseCount: 847,
        viewCount: 12340,
        publishedAt: new Date("2025-11-15"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: bazuProfile.id,
        title: "Hogyan építettem 100 milliós céget 23 évesen",
        description:
          "Kovács Bence, a RapidGrow alapítója meséli el, hogyan jutott el nulláról százmillió forintos árbevételig mindössze 23 évesen. Gyakorlati tippek, buktatók és a valóság.",
        slug: "100-millios-ceg-23-evesen",
        type: ContentType.PODCAST,
        priceHUF: 690,
        duration: 3600,
        videoUrl: "https://www.youtube.com/watch?v=Unzc731iCUY",
        thumbnailUrl: "https://img.youtube.com/vi/Unzc731iCUY/hqdefault.jpg",
        isPublished: true,
        isFree: false,
        purchaseCount: 1234,
        viewCount: 18920,
        publishedAt: new Date("2025-12-01"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: bazuProfile.id,
        title: "BAZU Podcast #127 — A magyar startup ökoszisztéma 2026-ban",
        description:
          "Vendégeink: három vezető befektető és két sikeres startup alapító. Merre tart a magyar tech szcéna? Hol vannak a lehetőségek?",
        slug: "bazu-podcast-127-startup-okoszisztema",
        type: ContentType.PODCAST,
        priceHUF: 0,
        duration: 4200,
        videoUrl: "https://www.youtube.com/watch?v=rUxyKA_-grg",
        thumbnailUrl: "https://img.youtube.com/vi/rUxyKA_-grg/hqdefault.jpg",
        isPublished: true,
        isFree: true,
        purchaseCount: 0,
        viewCount: 34560,
        publishedAt: new Date("2026-01-10"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: sneakerProfile.id,
        title: "Nike Dunk Low unboxing + árazási tippek viszonteladóknak",
        description:
          "Kicsomagolom az új Nike Dunk Low kollekciót és elmondom, hogyan árazd be a cipőket, ha viszonteladással foglalkozol. Pontos számok és stratégia.",
        slug: "nike-dunk-low-unboxing-arazas",
        type: ContentType.VIDEO,
        priceHUF: 490,
        duration: 1800,
        videoUrl: "https://www.youtube.com/watch?v=sEhy-RXkNo0",
        thumbnailUrl: "https://img.youtube.com/vi/sEhy-RXkNo0/hqdefault.jpg",
        isPublished: true,
        isFree: false,
        purchaseCount: 567,
        viewCount: 8920,
        publishedAt: new Date("2025-12-15"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: sneakerProfile.id,
        title: "A sneaker viszonteladás alapjai — Kezdő csomag",
        description:
          "Minden, amit tudnod kell, ha el akarod kezdeni a cipő viszonteladást. Honnan szerezz be, hogyan árazz, és hol adj el. 45 perces részletes útmutató.",
        slug: "sneaker-viszonteladas-alapjai",
        type: ContentType.EXCLUSIVE,
        priceHUF: 1990,
        duration: 2700,
        videoUrl: "https://www.youtube.com/watch?v=yP9Oj65OJTs",
        thumbnailUrl: "https://img.youtube.com/vi/yP9Oj65OJTs/hqdefault.jpg",
        isPublished: true,
        isFree: false,
        purchaseCount: 234,
        viewCount: 3450,
        publishedAt: new Date("2025-10-20"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: fitProfile.id,
        title: "30 napos otthoni edzésterv — Teljes videósorozat",
        description:
          "30 napos, progresszív edzésprogram otthonra, eszközök nélkül. Napi 30-45 perces edzések, bemelegítéssel és nyújtással. Kezdőknek is tökéletes!",
        slug: "30-napos-otthoni-edzesterv",
        type: ContentType.VIDEO,
        priceHUF: 1490,
        duration: 54000,
        videoUrl: "https://www.youtube.com/watch?v=gC_L9qAHVJ8",
        thumbnailUrl: "https://img.youtube.com/vi/gC_L9qAHVJ8/hqdefault.jpg",
        isPublished: true,
        isFree: false,
        purchaseCount: 892,
        viewCount: 15670,
        publishedAt: new Date("2025-09-01"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: fitProfile.id,
        title: "Egészséges meal prep receptek — Egy hét előre",
        description:
          "7 napra elegendő egészséges étel elkészítése egy vasárnap délután. Pontos receptek, bevásárlólista és kalória táblázat.",
        slug: "meal-prep-egy-het-elore",
        type: ContentType.VIDEO,
        priceHUF: 790,
        duration: 2400,
        videoUrl: "https://www.youtube.com/watch?v=E4gldVcaECk",
        thumbnailUrl: "https://img.youtube.com/vi/E4gldVcaECk/hqdefault.jpg",
        isPublished: true,
        isFree: false,
        purchaseCount: 445,
        viewCount: 6780,
        publishedAt: new Date("2025-11-20"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: techProfile.id,
        title: "iPhone 17 Pro vs Samsung S26 Ultra — Melyiket válaszd?",
        description:
          "Részletes összehasonlítás két hét használat után. Kamera, teljesítmény, akkumulátor, és ami igazán számít a mindennapokban.",
        slug: "iphone-17-vs-samsung-s26",
        type: ContentType.VIDEO,
        priceHUF: 390,
        duration: 1500,
        videoUrl: "https://www.youtube.com/watch?v=OTek3QHpM-s",
        thumbnailUrl: "https://img.youtube.com/vi/OTek3QHpM-s/hqdefault.jpg",
        isPublished: true,
        isFree: false,
        purchaseCount: 678,
        viewCount: 23450,
        publishedAt: new Date("2026-01-05"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: techProfile.id,
        title: "Legjobb laptop 200 ezer alatt 2026-ban — Top 5",
        description:
          "Összeszedtem az 5 legjobb laptopot 200 ezer forint alatt. Diákoknak, irodai munkára és könnyű gamingelésre.",
        slug: "legjobb-laptop-200-ezer-alatt",
        type: ContentType.VIDEO,
        priceHUF: 0,
        duration: 1200,
        videoUrl: "https://www.youtube.com/watch?v=ZYnp_ep2W1U",
        thumbnailUrl: "https://img.youtube.com/vi/ZYnp_ep2W1U/hqdefault.jpg",
        isPublished: true,
        isFree: true,
        purchaseCount: 0,
        viewCount: 45230,
        publishedAt: new Date("2026-01-20"),
      },
    }),
    prisma.content.create({
      data: {
        creatorId: beautyProfile.id,
        title: "Koreai bőrápolási rutin — 10 lépéses útmutató",
        description:
          "Lépésről lépésre megmutatom a tökéletes koreai bőrápolási rutint. Termékalapnlások minden bőrtípusra, magyar boltokból is beszerezhető márkákkal.",
        slug: "koreai-borapolasi-rutin",
        type: ContentType.VIDEO,
        priceHUF: 590,
        duration: 2100,
        videoUrl: "https://www.youtube.com/watch?v=_lfnr4gHECg",
        thumbnailUrl: "https://img.youtube.com/vi/_lfnr4gHECg/hqdefault.jpg",
        isPublished: true,
        isFree: false,
        purchaseCount: 1123,
        viewCount: 19870,
        publishedAt: new Date("2025-12-10"),
      },
    }),
  ]);

  // ============================================================
  // Live Events
  // ============================================================

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const liveEvents = await Promise.all([
    prisma.liveEvent.create({
      data: {
        creatorId: sneakerProfile.id,
        title: "Sneaker Kiárusítás — 50% kedvezmény!",
        description:
          "Heti élő kiárusítás! Nike, Adidas, New Balance cipők fél áron. Limitált készlet, aki előbb jön, előbb kap!",
        scheduledAt: tomorrow,
        status: LiveEventStatus.SCHEDULED,
        type: LiveEventType.SHOPPING,
        viewerCount: 0,
        peakViewerCount: 0,
      },
    }),
    prisma.liveEvent.create({
      data: {
        creatorId: bazuProfile.id,
        title: "BAZU LIVE: Kérdezz-felelek vállalkozókkal",
        description:
          "Élő Q&A session, ahol bármit kérdezhetsz meghívott vállalkozó vendégeinktől. Hozd a kérdéseidet!",
        scheduledAt: nextWeek,
        status: LiveEventStatus.SCHEDULED,
        type: LiveEventType.QA,
        viewerCount: 0,
        peakViewerCount: 0,
      },
    }),
    prisma.liveEvent.create({
      data: {
        creatorId: beautyProfile.id,
        title: "Tavaszi sminktrendek — Élő bemutató + akciós termékek",
        description:
          "Bemutatom a 2026-os tavaszi sminktrendeket és közben akciós áron megvásárolhatod a bemutatott termékeket!",
        scheduledAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        status: LiveEventStatus.SCHEDULED,
        type: LiveEventType.SHOPPING,
        viewerCount: 0,
        peakViewerCount: 0,
      },
    }),
  ]);

  // ============================================================
  // Live Products (for the sneaker live event)
  // ============================================================

  await Promise.all([
    prisma.liveProduct.create({
      data: {
        liveEventId: liveEvents[0].id,
        name: "Nike Dunk Low Panda",
        description: "Eredeti Nike Dunk Low fekete-fehér colorway. Méret: 40-45",
        originalPriceHUF: 44990,
        livePriceHUF: 22490,
        stockQuantity: 15,
        soldQuantity: 0,
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.liveProduct.create({
      data: {
        liveEventId: liveEvents[0].id,
        name: "Adidas Samba OG",
        description: "Klasszikus Adidas Samba fehér/fekete. Méret: 38-46",
        originalPriceHUF: 39990,
        livePriceHUF: 19990,
        stockQuantity: 20,
        soldQuantity: 0,
        isActive: true,
        displayOrder: 2,
      },
    }),
    prisma.liveProduct.create({
      data: {
        liveEventId: liveEvents[0].id,
        name: "New Balance 550",
        description: "New Balance 550 fehér/zöld. Limitált készlet! Méret: 39-44",
        originalPriceHUF: 42990,
        livePriceHUF: 24990,
        stockQuantity: 8,
        soldQuantity: 0,
        isActive: false,
        displayOrder: 3,
      },
    }),
    prisma.liveProduct.create({
      data: {
        liveEventId: liveEvents[0].id,
        name: "Nike Air Force 1 '07",
        description: "Az örök klasszikus fehér Air Force 1. Méret: 36-47",
        originalPriceHUF: 37990,
        livePriceHUF: 18990,
        stockQuantity: 25,
        soldQuantity: 0,
        isActive: false,
        displayOrder: 4,
      },
    }),
  ]);

  // ============================================================
  // Live Products (for the beauty live event)
  // ============================================================

  await Promise.all([
    prisma.liveProduct.create({
      data: {
        liveEventId: liveEvents[2].id,
        name: "COSRX Advanced Snail 96 Mucin Power Essence",
        description: "Koreai csiganyák esszencia, 100ml. Minden bőrtípusra.",
        originalPriceHUF: 6990,
        livePriceHUF: 3990,
        stockQuantity: 30,
        soldQuantity: 0,
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.liveProduct.create({
      data: {
        liveEventId: liveEvents[2].id,
        name: "Innisfree Green Tea Seed Serum",
        description: "Hidratáló zöld tea szérum, 80ml. Száraz és normál bőrre.",
        originalPriceHUF: 8490,
        livePriceHUF: 4990,
        stockQuantity: 20,
        soldQuantity: 0,
        isActive: true,
        displayOrder: 2,
      },
    }),
  ]);

  // ============================================================
  // Sample purchases for the buyer
  // ============================================================

  await Promise.all([
    prisma.purchase.create({
      data: {
        userId: buyerUser.id,
        contentId: contents[0].id,
        amountHUF: 990,
        platformFeeHUF: 149,
        creatorEarningHUF: 841,
        status: "COMPLETED",
        paymentMethod: "PLATFORM_WALLET",
      },
    }),
    prisma.purchase.create({
      data: {
        userId: buyerUser.id,
        contentId: contents[5].id,
        amountHUF: 1490,
        platformFeeHUF: 224,
        creatorEarningHUF: 1266,
        status: "COMPLETED",
        paymentMethod: "PLATFORM_WALLET",
      },
    }),
  ]);

  // ============================================================
  // Sample wallet transactions
  // ============================================================

  await Promise.all([
    prisma.walletTransaction.create({
      data: {
        userId: buyerUser.id,
        type: "TOP_UP",
        amountHUF: 15000,
        balanceBefore: 0,
        balanceAfter: 15000,
      },
    }),
    prisma.walletTransaction.create({
      data: {
        userId: buyerUser.id,
        type: "PURCHASE",
        amountHUF: -990,
        balanceBefore: 15000,
        balanceAfter: 14010,
      },
    }),
    prisma.walletTransaction.create({
      data: {
        userId: buyerUser.id,
        type: "PURCHASE",
        amountHUF: -1490,
        balanceBefore: 14010,
        balanceAfter: 12520,
      },
    }),
  ]);

  console.log("Seed complete!");
  console.log(`Created ${7} users`);
  console.log(`Created ${5} creator profiles`);
  console.log(`Created ${contents.length} content pieces`);
  console.log(`Created ${liveEvents.length} live events`);
  console.log(`Created ${6} live products`);
  console.log(`Created ${2} purchases`);
  console.log(`Created ${3} wallet transactions`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
