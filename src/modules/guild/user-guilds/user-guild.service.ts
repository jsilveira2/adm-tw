import { ErrorHelper } from '../../../helpers/error-helper';
import { GuildDb } from '@prisma/client';
import { IUserGuildRepositories } from './user-guild.repositories';
import { ServiceBase } from '../../base/base.service';

export class UserGuildService extends ServiceBase<GuildDb, string> {
    constructor(repository: IUserGuildRepositories) {
        super(repository, 'UserGuildService');
    }

    async findByUserId(userId: string): Promise<GuildDb[]> {
        const findData = await this.repository.findByUserId(userId);

        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByUserId', 'UserGuild not found', 404);
        }

        return findData;
    }

    async findByGuildId(guildId: string): Promise<GuildDb[]> {
        const findData = await this.repository.findByGuildId(guildId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByGuildId', 'UserGuild not found', 404);
        }

        return findData;
    }


    async deleteByUserId(userId: string): Promise<void> {
        await this.repository.deleteByUserId(userId);
    }

    async deleteByGuildId(guildId: string): Promise<void> {
        await this.repository.deleteByGuildId(guildId);
    }
}