import { createRoute } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi'

export const stageSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  date: z.string(),
  attendance: z.number(),
  lapLengthKm: z.number(),

  meta: z.any().optional()
});

const errorResponseSchema = z.object({
    success: z.literal(false),
    error: z.object({ message: z.string() }),
});

export const searchStageRoute = createRoute({
    method: 'get',
    path: '/search',
    query: z.object({ query: z.string() }),
    responses: {
        200: {
            description: 'Return meta data',
            content: {
                'application/json': {
                    schema: stageSchema.array(),
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: errorResponseSchema,
                },
            },
        },
    },
});