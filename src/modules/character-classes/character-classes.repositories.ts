import { CharacterClassesDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';

export abstract class ICharacterClasses extends IBaseRepositories<CharacterClassesDb, string> {

}
