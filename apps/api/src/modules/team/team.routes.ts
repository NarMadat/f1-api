import { OpenAPIHono } from "@hono/zod-openapi";
import * as TeamService from './team.service'
import { HTTPException } from "hono/http-exception";
import { getTeamRoute, createTeamRoute } from "./team.openapi";
import { teamSchema } from "./schemas/team.schema";

const teamRoutesOpenAPI = new OpenAPIHono();

teamRoutesOpenAPI.openapi(getTeamRoute, async (c) => {
    const result = await TeamService.getTeams();

    if (result instanceof HTTPException) throw result;

    return c.json(teamSchema.array().parse(result), 200);
})

teamRoutesOpenAPI.openapi(createTeamRoute, async (c) => {
    const data = c.req.valid('json');
    const result = await TeamService.createTeam(data);

    if (result instanceof HTTPException) throw result;

    return c.json({ message: 'Team created'}, 200)
})

export default teamRoutesOpenAPI;
