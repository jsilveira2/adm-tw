import { ErrorHelper } from '../../../helpers/error-helper';
import { ExternalPlayersDisponibilityDb } from '@prisma/client';
import { IExternalPlayersDisponibilityRepositories } from './external-players-disponibility.repositories';
import { ServiceBase } from '../../base/base.service';

export class ExternalPlayersDisponibilityService extends ServiceBase<ExternalPlayersDisponibilityDb, string> {
    constructor(public readonly repository: IExternalPlayersDisponibilityRepositories) {
        super(repository, 'ExternalPlayersDisponibilityService');
    }

    async findByPvPEventId(pvpEventId: string): Promise<ExternalPlayersDisponibilityDb[]> {
        const findData = await this.repository.findByPvPEventId(pvpEventId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByPvPEventId', 'External Player Disponibility not found', 404);
        }

        return findData;
    }

    async findByPvPEventIdAndDisponibility(pvpEventId: string, disponibility: number): Promise<ExternalPlayersDisponibilityDb[]> {
        const findData = await this.repository.findByPvPEventIdAndDisponibility(pvpEventId, disponibility);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByPvPEventIdAndDisponibility', 'External Player Disponibility not found', 404);
        }

        return findData;
    }

    async findByPvPEventIdAndDisponibilityYes(pvpEventId: string): Promise<ExternalPlayersDisponibilityDb[]> {
        const findData = await this.repository.findByPvPEventIdAndDisponibilityYes(pvpEventId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByPvPEventIdAndDisponibilityYes', 'External Player Disponibility not found', 404);
        }

        return findData;
    }

    async deleteByPvPEventId(pvpEventId: string): Promise<void> {
        await this.repository.deleteByPvPEventId(pvpEventId);
    }
}