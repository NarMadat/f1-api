import { OpenAPIHono } from "@hono/zod-openapi";
import * as MetaService from './meta-data.service'
import { HTTPException } from "hono/http-exception";
import { searchStageRoute } from "./meta-data.openapi";

const metaRoutesOpenAPI = new OpenAPIHono();

metaRoutesOpenAPI.openapi(searchStageRoute, async (c) => {
    const query = c.req.query();

    const search = query.q ?? query.search ?? query.meta;
    if (!search) throw new HTTPException(400, { message: 'Query parameter is required' });

    const results = await MetaService.searchStagesByMeta(String(search));
    return c.json(results, 200);
})

export default metaRoutesOpenAPI;