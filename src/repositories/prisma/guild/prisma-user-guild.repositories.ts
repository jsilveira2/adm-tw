import { UserGuildsDb } from '@prisma/client';
import { IUserGuildRepositories } from '../../../modules/guild/user-guilds/user-guild.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaUserGuildRepositories extends PrismaBaseRepositories<UserGuildsDb, string> implements IUserGuildRepositories {

    constructor() {
        super(prisma, (client) => client.permissionsDb);
    }

    async findByUserId(userId: string): Promise<UserGuildsDb[]> {
        return await this.db.userGuildsDb.findMany({ where: { userId } });
    }

    async findByGuildId(guildId: string): Promise<UserGuildsDb[]> {
        return await this.db.userGuildsDb.findMany({ where: { guildId } });
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.db.userGuildsDb.deleteMany({ where: { userId } });
    }

    async deleteByGuildId(guildId: string): Promise<void> {
        await this.db.userGuildsDb.deleteMany({ where: { guildId } });
    }
}