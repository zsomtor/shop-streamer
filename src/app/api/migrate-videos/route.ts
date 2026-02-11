import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const VIDEO_MAP: Record<string, { videoUrl: string; thumbnailUrl: string }> = {
  "polgar-judit-exkluziv-interju": {
    videoUrl: "https://www.youtube.com/watch?v=MT4VQqx_cjE",
    thumbnailUrl: "https://img.youtube.com/vi/MT4VQqx_cjE/hqdefault.jpg",
  },
  "100-millios-ceg-23-evesen": {
    videoUrl: "https://www.youtube.com/watch?v=Unzc731iCUY",
    thumbnailUrl: "https://img.youtube.com/vi/Unzc731iCUY/hqdefault.jpg",
  },
  "bazu-podcast-127-startup-okoszisztema": {
    videoUrl: "https://www.youtube.com/watch?v=rUxyKA_-grg",
    thumbnailUrl: "https://img.youtube.com/vi/rUxyKA_-grg/hqdefault.jpg",
  },
  "nike-dunk-low-unboxing-arazas": {
    videoUrl: "https://www.youtube.com/watch?v=sEhy-RXkNo0",
    thumbnailUrl: "https://img.youtube.com/vi/sEhy-RXkNo0/hqdefault.jpg",
  },
  "sneaker-viszonteladas-alapjai": {
    videoUrl: "https://www.youtube.com/watch?v=yP9Oj65OJTs",
    thumbnailUrl: "https://img.youtube.com/vi/yP9Oj65OJTs/hqdefault.jpg",
  },
  "30-napos-otthoni-edzesterv": {
    videoUrl: "https://www.youtube.com/watch?v=gC_L9qAHVJ8",
    thumbnailUrl: "https://img.youtube.com/vi/gC_L9qAHVJ8/hqdefault.jpg",
  },
  "meal-prep-egy-het-elore": {
    videoUrl: "https://www.youtube.com/watch?v=E4gldVcaECk",
    thumbnailUrl: "https://img.youtube.com/vi/E4gldVcaECk/hqdefault.jpg",
  },
  "iphone-17-vs-samsung-s26": {
    videoUrl: "https://www.youtube.com/watch?v=OTek3QHpM-s",
    thumbnailUrl: "https://img.youtube.com/vi/OTek3QHpM-s/hqdefault.jpg",
  },
  "legjobb-laptop-200-ezer-alatt": {
    videoUrl: "https://www.youtube.com/watch?v=ZYnp_ep2W1U",
    thumbnailUrl: "https://img.youtube.com/vi/ZYnp_ep2W1U/hqdefault.jpg",
  },
  "koreai-borapolasi-rutin": {
    videoUrl: "https://www.youtube.com/watch?v=_lfnr4gHECg",
    thumbnailUrl: "https://img.youtube.com/vi/_lfnr4gHECg/hqdefault.jpg",
  },
};

export async function GET() {
  try {
    let updated = 0;
    for (const [slug, urls] of Object.entries(VIDEO_MAP)) {
      const result = await prisma.content.updateMany({
        where: { slug },
        data: { videoUrl: urls.videoUrl, thumbnailUrl: urls.thumbnailUrl },
      });
      updated += result.count;
    }

    return NextResponse.json({
      status: "ok",
      message: `${updated} tartalom frissítve videó URL-ekkel.`,
      updated,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Ismeretlen hiba";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
