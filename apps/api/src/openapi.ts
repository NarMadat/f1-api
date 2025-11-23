import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from "hono/cors";
import { csrf } from 'hono/csrf'
import { logger } from '@/lib/utils'
import Env from "@/env";

const app = new OpenAPIHono();

app.use('*');
app.use(
    '*',
    cors({
        origin: Env.FORMULA_ONE_API_CORS_ORIGINS,
        credentials: true
    }),
    csrf({
        origin: Env.FORMULA_ONE_API_CSRF_ORIGINS,
    })
)

app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: Env.FORMULA_ONE_API_NODE_ENV
    })
})

const apiRoutes = new OpenAPIHono();
apiRoutes.use('*')
// apiRoutes.route('/service-list', listRoutesOpenAPI)
// apiRoutes.route('/order', orderRoutesOpenAPI)

app.route(`${Env.FORMULA_ONE_API_PREFIX}/${Env.FORMULA_ONE_API_VERSION}`, apiRoutes);

app.doc(`${Env.FORMULA_ONE_API_PREFIX}/openapi.json`, {
    openapi: '3.1.0',
    info: {
        title: 'Formula One API',
        version: '1.0.0',
    },
    servers: [
        {
            url: `http://localhost:${Env.FORMULA_ONE_API_PORT_APP}`,
            description: 'Local development server'
        }
    ],
    tags: [

    ]
})

app.get(`${Env.FORMULA_ONE_API_PREFIX}/reference`,
    Scalar({
        url: `${Env.FORMULA_ONE_API_PREFIX}/openapi.json`,
        theme: 'purple',
        layout: "modern",
        defaultHttpClient: {
            targetKey: 'js',
            clientKey: 'fetch'
        }
    })
)

app.notFound((c) => {
    return c.json({
        success: false,
        error: {
            message: 'Route not found'
        }
    }, 404)
})

logger.info('OpenAPI initialized')

export default app;
