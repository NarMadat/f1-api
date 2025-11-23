import { createRoute } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi'
import { teamSchema } from './schemas/team.schema';

export const getTeamRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Team Menagement'],
    description: 'Returns team member',
    responses: {
        200: {
        description: 'List of all team',
        content: {
            'application/json': {
            schema: teamSchema.array()
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

export const createTeamRoute = createRoute({
    method: 'post',
    path: '/',
    tags: ['Team Menagement'],
    description: 'Create team',
    request: {
    body: {
        content: {
            'application/json': {
            schema: teamSchema.omit({ id: true })
            },
        },
        },
    },
    responses: {
        200: {
        description: 'Create team',
        content: {
            'application/json': {
                schema: z.object({ message: z.string() })
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
