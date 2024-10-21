import { PvPEventPartyDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';

export abstract class IPvPEventPartyRepositories extends IBaseRepositories<PvPEventPartyDb, string> {
    abstract findByPvPEventId(pvpEventId: string): Promise<PvPEventPartyDb[]>;
    abstract findByName(name: string): Promise<PvPEventPartyDb[]>;
    abstract deleteByPvPEventId(pvpEventId: string): Promise<void>;
}