import { createRoute } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi'
import { resultSchema, resultFilterQuery, bulkUpdateResultsResponseSchema, resultWithDetailsSchema } from './schemas/results.schema';

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

// JOIN — результаты + данные Team и Stage
export const getResultsWithDetailsRoute = createRoute({
    method: 'get',
    path: '/details',
    description: 'Get results with team and stage details',
    query: z.object({
        stageId: z.string().optional(),
        teamId:  z.string().optional(),
    }),
    responses: {
        200: {
            description: 'Returns filtered result',
            content: {
                'application/json': {
                    schema: resultWithDetailsSchema.array(),
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: z.object({
                        success: z.literal(false),
                        error: z.object({ message: z.string() }),
                    }),
                },
            },
        },
    },
});

// UPDATE с нетривиальным условием (bulk-update)
export const bulkUpdateResultsRoute = createRoute({
    method: 'post',
    path: '/bulk-update',
    description: 'Bulk update some results',
    responses: {
        200: {
            description: 'Bulk update summary',
            content: {
                'application/json': {
                    schema: bulkUpdateResultsResponseSchema,
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: z.object({
                        success: z.literal(false),
                        error: z.object({ message: z.string() }),
                    }),
                },
            },
        },
    },
});