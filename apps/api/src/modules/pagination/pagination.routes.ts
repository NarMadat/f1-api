import { OpenAPIHono } from "@hono/zod-openapi";
import * as PaginationService from './pagination.service'
import { getResultsPaginatedRoute } from "./pagination.openapi";

const paginationRoutesOpenAPI = new OpenAPIHono();

paginationRoutesOpenAPI.openapi(getResultsPaginatedRoute, async (c) => {
      const q = c.req.query();
  const limit  = q.limit  ? Number(q.limit)  : undefined;
  const offset = q.offset ? Number(q.offset) : undefined;

  const { results, total } = await PaginationService.getResultsPaginated({ limit, offset });

  return c.json({ results, total, limit: limit ?? 20, offset: offset ?? 0 }, 200);
})

export default paginationRoutesOpenAPI;