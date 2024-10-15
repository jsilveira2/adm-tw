import { ErrorHelper } from '../../helpers/error-helper';
import { PvPEventDb } from '@prisma/client';
import { IPvPEventRepositories } from './pvp-event.repositories';
import { ServiceBase } from '../base/base.service';

export class PvPEventService extends ServiceBase<PvPEventDb, string> {
    constructor(repository: IPvPEventRepositories) {
        super(repository, 'PvPEventService');
    }

    async findByGuildId(guildId: string): Promise<PvPEventDb[]> {
        const findData = await this.repository.findByGuildId(guildId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByGuildId', 'PvPEvent not found', 404);
        }

        return findData;
    }

    async findByGuildAndNotEndedId(guildId: string): Promise<PvPEventDb[]> {
        const findData = await this.repository.findByGuildAndNotEndedId(guildId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByGuildAndNotEndedId', 'PvPEvent not found', 404);
        }

        return findData;
    }

    async deleteByGuildId(guildId: string): Promise<void> {
        await this.repository.deleteByGuildId(guildId);
    }
}