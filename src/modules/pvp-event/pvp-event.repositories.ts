import { PvPEventDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';

export abstract class IPvPEventRepositories extends IBaseRepositories<PvPEventDb, string> {
    abstract findByGuildId(guildId: string): Promise<PvPEventDb[]>;
    abstract findByGuildAndNotEndedId(guildId: string): Promise<PvPEventDb[]>;
    abstract deleteByGuildId(guildId: string): Promise<void>;
}