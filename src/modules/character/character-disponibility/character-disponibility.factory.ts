import { PrismaCharacterDisponibilityRepositories } from '../../../repositories/prisma/character/prisma-character-disponibility.repositories';
import { CharacterDisponibilityController } from './character-disponibility.controller';
import { CharacterDisponibilityService } from './character-disponibility.service';
import { FactoryBase } from '../../base/base.factory';

class CharacterDisponibilityFactory extends FactoryBase<CharacterDisponibilityController, CharacterDisponibilityService, PrismaCharacterDisponibilityRepositories> {
    constructor() {
        super(PrismaCharacterDisponibilityRepositories, CharacterDisponibilityService, CharacterDisponibilityController);
    }
}

export const characterDisponibilityFactory = new CharacterDisponibilityFactory().createControllerService();