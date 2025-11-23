import { prisma } from '@/lib/utils'
import type { TeamSchema } from './schemas/team.schema'

export async function getTeams() {
    return prisma.team.findMany();
}

export async function createTeam(data: TeamSchema) {
    try {
        const res = await prisma.team.create({
            data: { ...data }
        });
        return { message: "Team created successfully" };
    } catch (error) {
        throw new Error(`Failed to create team: ${error}`);
    }
}