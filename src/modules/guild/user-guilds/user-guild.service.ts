import { ErrorHelper } from '../../../helpers/error-helper';
import { UserGuildsDb } from '@prisma/client';
import { IUserGuildRepositories } from './user-guild.repositories';
import { ServiceBase } from '../../base/base.service';
import { UserGuild } from './schema';

export class UserGuildService extends ServiceBase<UserGuildsDb, string> {
    constructor(repository: IUserGuildRepositories) {
        super(repository, 'UserGuildService');
    }

    async findByUserId(userId: string): Promise<UserGuildsDb[]> {
        const findData = await this.repository.findByUserId(userId);

        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByUserId', 'UserGuild not found', 404);
        }

        return findData;
    }

    async findByGuildId(guildId: string): Promise<UserGuildsDb[]> {
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

    async createMany(obj: UserGuild[]): Promise<UserGuildsDb[]> {
        if (obj && obj.length > 0) {
            const guildId = obj[0].guildId;
            if (!guildId) {
                throw new ErrorHelper(this.className, 'createMany', 'Invalid Guild ID', 400);
            }

            await this.deleteByGuildId(guildId);
            const data = await this.repository.createMany(obj);
            if (!data) {
                throw new ErrorHelper(this.className, 'createMany', 'Fail to create UserGuild', 400);
            }

            return data;
        } else {
            throw new ErrorHelper(this.className, 'createMany', 'Missing objects to save', 400);
        }
    }
}