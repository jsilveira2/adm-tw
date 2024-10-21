import { PvPEventDb } from '@prisma/client';
import { IPvPEventRepositories } from '../../../modules/pvp-event/pvp-event.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaPvPEventRepositories extends PrismaBaseRepositories<PvPEventDb, string> implements IPvPEventRepositories {

    constructor() {
        super(prisma, (client) => client.pvPEventDb);
    }

    async findByGuildId(guildId: string): Promise<PvPEventDb[]> {
        return await this.db.pvPEventDb.findMany({ where: { guildId } });
    }

    async findByGuildAndNotEndedId(guildId: string): Promise<PvPEventDb[]> {
        return await this.db.pvPEventDb.findMany({ where: { guildId, ended: false } });
    }

    async deleteByGuildId(guildId: string): Promise<void> {
        await this.db.pvPEventDb.deleteMany({ where: { guildId } });
    }
}