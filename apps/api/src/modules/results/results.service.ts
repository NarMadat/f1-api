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

export async function getResultsWithDetails(params: {
  stageId?: number;
  teamId?: number;
}) {
  const where: any = {};
  if (params.stageId !== undefined) where.stageId = params.stageId;
  if (params.teamId !== undefined)  where.teamId = params.teamId;

  const results = await prisma.result.findMany({
    where,
    include: {
      team: { select: { id: true, name: true, country: true } },
      stage: { select: { id: true, name: true, date: true } }
    },
    orderBy: { raceTimeMs: 'asc' }
  });

  return results;
}

export async function bulkUpdateResults() {
  const res = await prisma.result.updateMany({
    where: {
      pitstops: { gt: 2 },
      laps:     { lt: 40 }
    },
    data: {
      laps:     { increment: 5 },
      pitstops: { decrement: 1 }
    }
  });
  return res;
}
