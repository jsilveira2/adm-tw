import { PartyMembersDb } from '@prisma/client';
import { IPartyMembersRepositories } from '../../../modules/pvp-event-party/party-members/party-members.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaPartyMembersRepositories extends PrismaBaseRepositories<PartyMembersDb, string> implements IPartyMembersRepositories {

    constructor() {
        super(prisma, (client) => client.partyMembersDb);
    }

    async findByPartyId(pvpPartyId: string): Promise<PartyMembersDb[]> {
        return await this.db.partyMembersDb.findMany({ where: { pvpPartyId } });
    }

    async findByCharacterId(characterId: string): Promise<PartyMembersDb[]> {
        return await this.db.partyMembersDb.findMany({ where: { characterId } });
    }

    async deleteByPartyId(pvpPartyId: string): Promise<void> {
        await this.db.partyMembersDb.deleteMany({ where: { pvpPartyId } });
    }
}