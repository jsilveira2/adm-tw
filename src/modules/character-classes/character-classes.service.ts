import { CharacterClassesDb } from '@prisma/client';
import { ServiceBase } from '../base/base.service';
import { ICharacterClasses } from './character-classes.repositories';

export class CharacterClassesService extends ServiceBase<CharacterClassesDb, string> {
    constructor(repository: ICharacterClasses) {
        super(repository, 'CharacterClassesService');
    }
}
