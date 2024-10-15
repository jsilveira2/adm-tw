import { PrismaCharacterClasses } from '../../repositories/prisma/character/prisma-character-classes.repositores';
import { CharacterClassesController } from './character-classes.controller';
import { CharacterClassesService } from './character-classes.service';
import { FactoryBase } from '../base/base.factory';

class CharacterClassesFactory extends FactoryBase<CharacterClassesController, CharacterClassesService, PrismaCharacterClasses> {
    constructor() {
        super(PrismaCharacterClasses, CharacterClassesService, CharacterClassesController);
    }
}

export const characterClassesFactory = new CharacterClassesFactory().createControllerService();
