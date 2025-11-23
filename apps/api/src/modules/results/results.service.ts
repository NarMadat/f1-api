import { prisma } from '@/lib/utils';
import { ResultFilterQuery } from './schemas/results.schema'


export async function filterResult(params: ResultFilterQuery) {
  const { teamId, lapsMin, position } = params;

  const where: any = {};

  if (teamId !== undefined) {
    where.teamId = teamId;
  }
  if (lapsMin !== undefined) {
    where.laps = { ...where.laps, lte: lapsMin };
  }
  if (position !== undefined) {
    where.position = position;
  }

  const results = await prisma.result.findMany({
    where,
    include: {
      team:   { select: { id: true, name: true, country: true } },
      stage:  { select: { id: true, name: true, date: true } }
    },
    orderBy: { raceTimeMs: 'asc' }
  });

  return results;
}
