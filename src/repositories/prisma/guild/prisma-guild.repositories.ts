import { GuildDb } from '@prisma/client';
import { Guild } from '../../../modules/guild/schema';
import { IGuildRepositories } from '../../guild/guild.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaGuildRepositories implements IGuildRepositories {

    private readonly db = prisma.guildDb;

    async findAll(): Promise<GuildDb[]> {
        const data = await this.db.findMany();

        return data;
    }

    async findById(id: string): Promise<GuildDb | null> {
        const data = await this.db.findUnique({ where: { id } });
        return data;
    }

    async save(obj: Guild): Promise<GuildDb> {
        const newObj = await this.db.create({
            data: { ...obj }
        });

        return newObj;
    }

    async update(obj: Guild): Promise<GuildDb> {
        const id = obj.id;
        const newObj = await this.db.update({
            where: { id },
            data: { ...obj }
        });

        return newObj;
    }

    async delete(id: string): Promise<void> {
        await this.db.delete({ where: { id } });
    }
}