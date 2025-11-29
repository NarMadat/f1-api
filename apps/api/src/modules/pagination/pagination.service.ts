import { prisma } from '@/lib/utils';

export async function getResultsPaginated(
  params: {
    limit?: number;
    offset?: number;
  }
) {
  const { limit, offset } = params;
  const results = await prisma.result.findMany({
    take: limit ?? 20,
    skip: offset ?? 0,
    orderBy: { raceTimeMs: 'asc' },
  });

  const total = await prisma.result.count();

  return { results, total };
}