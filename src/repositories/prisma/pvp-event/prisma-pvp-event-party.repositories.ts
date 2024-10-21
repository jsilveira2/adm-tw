import { PvPEventPartyDb } from '@prisma/client';
import { IPvPEventPartyRepositories } from '../../../modules/pvp-event-party/pvp-event-party.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaPvPEventPartyRepositories extends PrismaBaseRepositories<PvPEventPartyDb, string> implements IPvPEventPartyRepositories {

    constructor() {
        super(prisma, (client) => client.pvPEventPartyDb);
    }

    async findByPvPEventId(pvpEventId: string): Promise<PvPEventPartyDb[]> {
        return await this.db.pvPEventPartyDb.findMany({ where: { pvpEventId } });
    }

    async findByName(name: string): Promise<PvPEventPartyDb[]> {
        return await this.db.pvPEventPartyDb.findMany({ where: { name: { contains: name } } });
    }

    async deleteByPvPEventId(pvpEventId: string): Promise<void> {
        await this.db.pvPEventPartyDb.deleteMany({ where: { pvpEventId } });
    }
}