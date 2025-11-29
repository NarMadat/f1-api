import { prisma } from '@/lib/utils';

export async function searchStagesByMeta(query: string) {
  return prisma.$queryRawUnsafe(
    `SELECT * FROM "Stage"
     WHERE (meta::text) ILIKE '%' || $1 || '%'`
    , query
  );
}