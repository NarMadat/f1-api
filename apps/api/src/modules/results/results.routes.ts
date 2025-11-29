import { OpenAPIHono } from "@hono/zod-openapi";
import * as ResultService from './results.service'
import { HTTPException } from "hono/http-exception";
import { bulkUpdateResultsRoute, getFilteredResultRoute, getResultsWithDetailsRoute } from "./results.openapi";

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

resultRoutesOpenAPI.openapi(getResultsWithDetailsRoute, async (c) => {
  const query = c.req.query();
  if (!query) throw new HTTPException(500, { message: 'Query not found'});

  const results = await ResultService.getResultsWithDetails({
    stageId: query.stageId ? Number(query.stageId) : undefined,
    teamId:  query.teamId  ? Number(query.teamId)  : undefined,
  });
  return c.json(results, 200);
})

resultRoutesOpenAPI.openapi(bulkUpdateResultsRoute, async (c) => {
  const result = await ResultService.bulkUpdateResults();
  return c.json({ updated: result.count }, 200);
})

export default resultRoutesOpenAPI;