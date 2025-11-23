import { serve } from '@hono/node-server'
import app from './openapi'
import Env from '@/env'

const port: number = Number(Env.FORMULA_ONE_API_PORT_APP);

try {
    serve({
        fetch: app.fetch,
        port
    });

    console.log('\n🚀 Server is running!\n')
    console.log(`📍 Server:          http://localhost:${port}`);
    console.log(`📍 API:             http://localhost:${port}${Env.FORMULA_ONE_API_PREFIX}/${Env.FORMULA_ONE_API_VERSION}`);
    console.log(`📍 Health check:    http://localhost:${port}/health`);
    console.log(`📚 API Reference:   http://localhost:${port}${Env.FORMULA_ONE_API_PREFIX}/reference`);
    console.log(`📄 OpenAPI Spec:    http://localhost:${port}${Env.FORMULA_ONE_API_PREFIX}/openapi.json`);
} catch(err) {
    console.error('❌ Failed to start server:', err);
}
