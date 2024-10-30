import { UserGuildsDb } from '@prisma/client';
import { IBaseRepositories } from '../../base/base.repositories';
import { UserGuild } from './schema';

export abstract class IUserGuildRepositories extends IBaseRepositories<UserGuildsDb, string> {
	abstract findByUserId(userId: string): Promise<UserGuildsDb[]>;
    abstract findByGuildId(guildId: string): Promise<UserGuildsDb[]>;
	abstract deleteByUserId(userId: string): Promise<void>;
    abstract deleteByGuildId(guildId: string): Promise<void>;
    abstract createMany(obj: UserGuild[]): Promise<UserGuildsDb[]>;
}