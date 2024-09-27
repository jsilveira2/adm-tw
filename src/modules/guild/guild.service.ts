import { ErrorHelper } from '../../helpers/error-helper';
import { GuildDb } from '@prisma/client';
import { Guild } from './schema';
import { IGuildRepositories } from '../../repositories/guild/guild.repositories';

export class GuildService {

    private readonly className = 'GuildService';

    constructor(private repository: IGuildRepositories) { }

    async findAll(): Promise<GuildDb[]> {
        const findData = await this.repository.findAll();

        return findData;
    }

    async findById(id: string): Promise<GuildDb> {
        const findData = await this.repository.findById(id);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findById', 'Guild not found', 404);
        }

        return findData;
    }

    async create(obj: Guild): Promise<GuildDb> {
        const data = await this.repository.save(obj);

        return data;
    }

    async update(id: string, obj: Guild): Promise<GuildDb> {
        const exists = await this.repository.findById(id);

        if (!exists) {
            throw new ErrorHelper(this.className, 'update', 'Guild not found', 404);
        }

        obj.updatedAt = new Date();
        return await this.repository.update(obj);
    }

    async delete(id: string): Promise<void> {
        const exists = await this.repository.findById(id);

        if (!exists) {
            throw new ErrorHelper(this.className, 'delete', 'Guild not found', 404);
        }

        await this.repository.delete(id);
    }
}