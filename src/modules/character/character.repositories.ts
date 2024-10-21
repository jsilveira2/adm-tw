import { CharactersDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';

export abstract class ICharacter extends IBaseRepositories<CharactersDb, string> {
    abstract findByGuildId(guildId: string): Promise<CharactersDb[]>;
    abstract deleteByGuildId(guildId: string): Promise<void>;
}
