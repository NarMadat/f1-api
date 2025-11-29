import { z } from '@hono/zod-openapi'

export const resultFilterQuery = z.object({
  teamId: z.number().optional(),
  lapsMin: z.number().optional(),
  position: z.number().optional(),
});

export const resultSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  stageId: z.number(),
  driverName: z.string(),
  laps: z.number(),
  raceTimeMs: z.number(),
  position: z.number(),
  pitstops: z.number(),

  team: z.object({ id: z.number(), name: z.string(), country: z.string() }).optional(),
  stage: z.object({ id: z.number(), name: z.string(), date: z.string() }).optional(),
});

export const resultWithDetailsSchema = z.object({
    id: z.number(),
    driverName: z.string(),
    laps: z.number(),
    raceTimeMs: z.number(),
    position: z.number(),
    pitstops: z.number(),
    team: z.object({
        id: z.number(),
        name: z.string(),
        country: z.string(),
    }),
    stage: z.object({
        id: z.number(),
        name: z.string(),
        date: z.string(),
    }),
});

export const bulkUpdateResultsResponseSchema = z.object({ updated: z.number() });

export type ResultFilterQuery = z.infer<typeof resultFilterQuery>
export type ResultSchema = z.infer<typeof resultSchema>