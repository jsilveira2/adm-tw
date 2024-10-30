import { UserGuildsDb } from '@prisma/client';
import { IUserGuildRepositories } from '../../../modules/guild/user-guilds/user-guild.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';
import { UserGuild } from '../../../modules/guild/user-guilds/schema';

export class PrismaUserGuildRepositories extends PrismaBaseRepositories<UserGuildsDb, string> implements IUserGuildRepositories {

    constructor() {
        super(prisma, (client) => client.userGuildsDb);
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

    async createMany(obj: UserGuild[]): Promise<UserGuildsDb[]> {
        const data = await this.db.userGuildsDb.createMany({
            data: obj.map(userGuild => ({
                userId: userGuild.userId,
                guildId: userGuild.guildId
            })),
        });

        const createdRoles = await this.db.userGuildsDb.findMany({
            where: { userId: obj[0].guildId }
        });

        return createdRoles;
    }
}