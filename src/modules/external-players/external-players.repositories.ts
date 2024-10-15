import { ExternalPlayersDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';

export abstract class IExternalPlayersRepositories extends IBaseRepositories<ExternalPlayersDb, string> {
    abstract findByGuildId(guildId: string): Promise<ExternalPlayersDb[]>;
    abstract deleteByGuildId(guildId: string): Promise<void>;
}