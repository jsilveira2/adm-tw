import { ErrorHelper } from '../../../helpers/error-helper';
import { PartyMembersDb } from '@prisma/client';
import { IPartyMembersRepositories } from './party-members.repositories';
import { ServiceBase } from '../../base/base.service';

export class PartyMembersService extends ServiceBase<PartyMembersDb, string> {
    constructor(public readonly repository: IPartyMembersRepositories) {
        super(repository, 'PartyMembersService');
    }

    async findByPartyId(partyId: string): Promise<PartyMembersDb[]> {
        const findData = await this.repository.findByPartyId(partyId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByPartyId', 'Party Members not found', 404);
        }

        return findData;
    }

    async findByCharacterId(characterId: string): Promise<PartyMembersDb[]> {
        const findData = await this.repository.findByCharacterId(characterId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByCharacterId', 'Party Member not found', 404);
        }

        return findData;
    }

    async deleteByPartyId(partyId: string): Promise<void> {
        await this.repository.deleteByPartyId(partyId);
    }
}