import { createRoute } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
import { resultSchema } from '../results/schemas/results.schema';

export const paginationQuery = z.object({
  limit:  z.string().optional(),
  offset: z.string().optional()
});

export const getResultsPaginatedRoute = createRoute({
  method: 'get',
  path: '/paginated',
  query: paginationQuery,
  responses: {
    200: {
      description: 'Returns  pagination',
      content: {
        'application/json': {
          schema: z.object({
            results: z.array(resultSchema),
            total: z.number(),
            limit: z.number(),
            offset: z.number()
          })
        }
      }
    },
    500: {
        description: 'Internal server error',
        content: {
            'application/json': {
            schema: z.object({
                success: z.literal(false),
                error: z.object({ message: z.string() })
            }),
            },
        },
    },
  }
});
