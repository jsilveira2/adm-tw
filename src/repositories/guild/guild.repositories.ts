import { GuildDb } from '@prisma/client';
import { Guild } from '../../modules/guild/schema';

export abstract class IGuildRepositories {
    abstract findAll(): Promise<GuildDb[]>;
    abstract findById(id: string): Promise<GuildDb | null>;
    abstract save(obj: Guild): Promise<GuildDb>;
    abstract update(obj: Guild): Promise<GuildDb>;
    abstract delete(id: string): Promise<void>;
}