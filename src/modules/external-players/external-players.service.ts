import { ErrorHelper } from '../../helpers/error-helper';
import { ExternalPlayersDb } from '@prisma/client';
import { IExternalPlayersRepositories } from './external-players.repositories';
import { ServiceBase } from '../base/base.service';

export class ExternalPlayersService extends ServiceBase<ExternalPlayersDb, string> {
    constructor(repository: IExternalPlayersRepositories) {
        super(repository, 'ExternalPlayersService');
    }

    async findByGuildId(guildId: string): Promise<ExternalPlayersDb[]> {
        const findData = await this.repository.findByGuildId(guildId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByGuildId', 'External Player not found', 404);
        }

        return findData;
    }

    async deleteByGuildId(guildId: string): Promise<void> {
        await this.repository.deleteByGuildId(guildId);
    }
}