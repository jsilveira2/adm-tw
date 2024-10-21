import { PrismaCharacterRepositories } from '../../repositories/prisma/character/prisma-character.repositories';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { FactoryBase } from '../base/base.factory';

class CharacterFactory extends FactoryBase<CharacterController, CharacterService, PrismaCharacterRepositories> {
    constructor() {
        super(PrismaCharacterRepositories, CharacterService, CharacterController);
    }
}

export const characterFactory = new CharacterFactory().createControllerService();