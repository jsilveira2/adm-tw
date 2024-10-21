import { PartyMembersDb } from '@prisma/client';
import { IBaseRepositories } from '../../base/base.repositories';

export abstract class IPartyMembersRepositories extends IBaseRepositories<PartyMembersDb, string> {
    abstract findByPartyId(pvpPartyId: string): Promise<PartyMembersDb[]>;
    abstract findByCharacterId(characterId: string): Promise<PartyMembersDb[]>;
    abstract deleteByPartyId(pvpPartyId: string): Promise<void>;
}