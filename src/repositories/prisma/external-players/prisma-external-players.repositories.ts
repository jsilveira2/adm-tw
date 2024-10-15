import { ExternalPlayersDb } from '@prisma/client';
import { IExternalPlayersRepositories } from '../../../modules/external-players/external-players.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaExternalPlayersRepositories extends PrismaBaseRepositories<ExternalPlayersDb, string> implements IExternalPlayersRepositories {

    constructor() {
        super(prisma, (client) => client.permissionsDb);
    }

    async findByGuildId(guildId: string): Promise<ExternalPlayersDb[]> {
        return await this.db.externalPlayersDb.findMany({ where: { guildId } });
    }

    async deleteByGuildId(guildId: string): Promise<void> {
        await this.db.externalPlayersDb.deleteMany({ where: { guildId } });
    }
}