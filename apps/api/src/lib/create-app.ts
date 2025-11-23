import { OpenAPIHono } from "@hono/zod-openapi";
import type { MiddlewareHandler } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import Env from '@/env'
import { HTTPException } from "hono/http-exception";

export function createRouter(...handless: MiddlewareHandler[]) {
    const router = new OpenAPIHono();

    if(handless.length) router.use(...handless);
    return router
}

export function createApp() {
    const app = createRouter();

    app.use(
        '*',
        cors({
            origin: Env.FORMULA_ONE_API_CORS_ORIGINS,
            credentials: true
        }),
        csrf({
            origin: Env.FORMULA_ONE_API_CSRF_ORIGINS
        })
    )

    app.notFound(() => {
        throw new HTTPException(404, { message: 'Route not found' });
    });

    return app;
}