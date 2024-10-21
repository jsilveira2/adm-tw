import { CharacterEventDisponibilityDb } from '@prisma/client';
import { IBaseRepositories } from '../../base/base.repositories';

export abstract class ICharacterDisponibility extends IBaseRepositories<CharacterEventDisponibilityDb, string> {
    abstract findByPvPEventId(pvpEventId: string): Promise<CharacterEventDisponibilityDb[]>;
    abstract findByPvPEventIdAndDisponibilityYes(pvpEventId: string): Promise<CharacterEventDisponibilityDb[]>;
    abstract deleteByPvPEventId(pvpEventId: string): Promise<void>;
}
