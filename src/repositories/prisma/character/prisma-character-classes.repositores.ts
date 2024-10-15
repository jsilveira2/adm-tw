import { CharacterClassesDb } from '@prisma/client';
import { prisma } from '../../../database/prisma';
import { PrismaBaseRepositories } from '../../prisma/base/prisma-base.repositories';
import { ICharacterClasses } from '../../../modules/character-classes/character-classes.repositories';

export class PrismaCharacterClasses extends PrismaBaseRepositories<CharacterClassesDb, string> implements ICharacterClasses {

    constructor() {
        super(prisma, (client) => client.characterClassesDb);
    }
}
