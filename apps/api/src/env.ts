import { NodeEnv } from '@/types'
import { config } from 'dotenv'
import { exit } from 'node:process';
import { z } from '@hono/zod-openapi'

config();
const EnvSchemaBase = z.object({
    FORMULA_ONE_API_PORT_APP: z.string().regex(/^\d+$/).default('3029').transform(Number),
    FORMULA_ONE_API_NODE_ENV: z.enum(NodeEnv).default(NodeEnv.Production),
    FORMULA_ONE_API_LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

    FORMULA_ONE_API_CORS_ORIGINS: z.string(),
    FORMULA_ONE_API_CSRF_ORIGINS: z.string(),

    FORMULA_ONE_API_OPENAPI_PATH: z.string().default('openapi'),

    FORMULA_ONE_API_PREFIX: z.string(),
    FORMULA_ONE_API_VERSION: z.string(),

    FORMULA_ONE_DATABASE_URL: z.string(),
})

const { data: Env, error } = EnvSchemaBase.safeParse(process.env);

if(error) {
    console.error('❌ Invalid env:');
    console.error(JSON.stringify(z.treeifyError(error), null, 2));
    exit(1);
}

export default Env!;