import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrismaClient(): PrismaClient {
  const url = process.env.POSTGRES_URL;
  // Supabase uses PgBouncer for connection pooling — must disable prepared statements
  if (url && url.includes("supabase") && !url.includes("pgbouncer=true")) {
    const fixedUrl = url + (url.includes("?") ? "&" : "?") + "pgbouncer=true";
    return new PrismaClient({ datasources: { db: { url: fixedUrl } } });
  }
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? makePrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
