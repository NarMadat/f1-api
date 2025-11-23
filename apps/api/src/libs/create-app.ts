import { OpenAPIHono } from "@hono/zod-openapi";
import type { MiddlewareHandler } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
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
            origin: '*',
            credentials: true
        }),
        csrf({
            origin: '*'
        })
    )

    app.notFound(() => {
        throw new HTTPException(404, { message: 'Route not found' });
    });

    return app;
}