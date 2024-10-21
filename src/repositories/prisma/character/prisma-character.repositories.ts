import { CharactersDb } from '@prisma/client';
import { ICharacter } from '../../../modules/character/character.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaCharacterRepositories extends PrismaBaseRepositories<CharactersDb, string> implements ICharacter {

    constructor() {
        super(prisma, (client) => client.charactersDb);
    }

    async findByGuildId(guildId: string): Promise<CharactersDb[]> {
        return await this.db.charactersDb.findMany({ where: { guildId } });
    }

    async deleteByGuildId(guildId: string): Promise<void> {
        await this.db.charactersDb.deleteMany({ where: { guildId } });
    }
}