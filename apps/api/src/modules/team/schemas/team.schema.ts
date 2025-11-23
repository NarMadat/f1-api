import { z } from '@hono/zod-openapi'

export const teamSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    country: z.string(),
    engine: z.string(),
    tyre: z.string()
})

export type TeamSchema = z.infer<typeof teamSchema>