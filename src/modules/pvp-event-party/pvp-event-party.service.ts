import { ErrorHelper } from '../../helpers/error-helper';
import { PvPEventPartyDb } from '@prisma/client';
import { IPvPEventPartyRepositories } from './pvp-event-party.repositories';
import { ServiceBase } from '../base/base.service';

export class PvPEventPartyService extends ServiceBase<PvPEventPartyDb, string> {
    constructor(public readonly repository: IPvPEventPartyRepositories) {
        super(repository, 'PvPEventPartyService');
    }

    async findByPvPEventId(pvpEventId: string): Promise<PvPEventPartyDb[]> {
        const findData = await this.repository.findByPvPEventId(pvpEventId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByPvPEventId', 'PvP Event Party not found', 404);
        }

        return findData;
    }

    async findByName(name: string): Promise<PvPEventPartyDb[]> {
        const findData = await this.repository.findByName(name);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByName', 'PvP Event Party not found', 404);
        }

        return findData;
    }

    async deleteByPvPEventId(pvpEventId: string): Promise<void> {
        await this.repository.deleteByPvPEventId(pvpEventId);
    }
}