import { createRoute } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi'
import { resultSchema, resultFilterQuery } from './schemas/results.schema';

export const getFilteredResultRoute = createRoute({
    method: 'get',
    path: '/filter',
    tags: ['Result Menagement'],
    description: 'Returns filtered result',
    request: {
        query: resultFilterQuery,
    },
    responses: {
        200: {
        description: 'Returns filtered result',
        content: {
            'application/json': {
                schema: resultSchema.array()
            },
        },
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
    },
});