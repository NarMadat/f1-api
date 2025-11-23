import { OpenAPIHono } from "@hono/zod-openapi";
import * as ResultService from './results.service'
import { HTTPException } from "hono/http-exception";
import { getFilteredResultRoute } from "./results.openapi";

const resultRoutesOpenAPI = new OpenAPIHono();

resultRoutesOpenAPI.openapi(getFilteredResultRoute, async (c) => {
    const query = c.req.valid('query');
    if (!query) throw new HTTPException(500, { message: 'Query not found'});

    const { teamId, lapsMin, position } = query;

    const params = {
      teamId: teamId ? Number(teamId) : undefined,
      lapsMin: lapsMin ? Number(lapsMin) : undefined,
      position: position ? Number(position) : undefined,
    };

    const results = await ResultService.filterResult(params);
    return c.json(results, 200);
})

export default resultRoutesOpenAPI;