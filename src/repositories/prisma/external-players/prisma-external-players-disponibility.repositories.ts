import { ExternalPlayersDisponibilityDb } from '@prisma/client';
import { IExternalPlayersDisponibilityRepositories } from '../../../modules/external-players/external-players-disponibility/external-players-disponibility.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaExternalPlayersDisponibilityRepositories extends PrismaBaseRepositories<ExternalPlayersDisponibilityDb, string> implements IExternalPlayersDisponibilityRepositories {

    constructor() {
        super(prisma, (client) => client.permissionsDb);
    }

    async findByPvPEventId(pvpEventId: string): Promise<ExternalPlayersDisponibilityDb[]> {
        return await this.db.externalPlayersDisponibilityDb.findMany({ where: { pvpEventId } });
    }

    async findByPvPEventIdAndDisponibility(pvpEventId: string, disponibility: number): Promise<ExternalPlayersDisponibilityDb[]> {
        return await this.db.externalPlayersDisponibilityDb.findMany({ where: { pvpEventId, disponibility } });
    }

    async deleteByPvPEventId(pvpEventId: string): Promise<void> {
        await this.db.externalPlayersDisponibilityDb.deleteMany({ where: { pvpEventId } });
    }
}