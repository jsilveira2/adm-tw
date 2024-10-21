import { CharacterEventDisponibilityDb } from '@prisma/client';
import { ICharacterDisponibility } from '../../../modules/character/character-disponibility/character-disponibility.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';
import { Disponibility } from '../../../enum/disponibility.enum';

export class PrismaCharacterDisponibilityRepositories extends PrismaBaseRepositories<CharacterEventDisponibilityDb, string> implements ICharacterDisponibility {

    constructor() {
        super(prisma, (client) => client.characterEventDisponibilityDb);
    }

    async findByPvPEventId(pvpEventId: string): Promise<CharacterEventDisponibilityDb[]> {
        return await this.db.characterEventDisponibilityDb.findMany({ where: { pvpEventId } });
    }

    async findByPvPEventIdAndDisponibilityYes(pvpEventId: string): Promise<CharacterEventDisponibilityDb[]> {
        return await this.db.characterEventDisponibilityDb.findMany({ where: { pvpEventId, disponibility: Disponibility.Yes } });
    }

    async deleteByPvPEventId(pvpEventId: string): Promise<void> {
        await this.db.characterEventDisponibilityDb.deleteMany({ where: { pvpEventId } });
    }
}