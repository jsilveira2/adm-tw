import { ErrorHelper } from '../../../helpers/error-helper';
import { RolesDb } from '@prisma/client';
import { Role } from './schema';
import { IRolesRepositories } from '../../../repositories/adm/roles.repositories';

export class RolesService {

    private readonly className = 'RolesService';

    constructor(private repository: IRolesRepositories) { }

    async findById(id: string): Promise<RolesDb> {
        const findData = await this.repository.findById(id);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findById', 'Role not found', 404);
        }

        return findData;
    }

    async findByArrayIds(ids: string[]): Promise<RolesDb[]> {
        const findData = await this.repository.findByArrayIds(ids);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findByArrayIds', 'Roles not found', 404);
        }

        return findData;
    }

    async create(obj: Role): Promise<RolesDb> {
        const data = await this.repository.save(obj);

        return data;
    }

    async update(id: string, obj: Role): Promise<RolesDb> {
        const exists = await this.repository.findById(id);

        if (!exists) {
            throw new ErrorHelper(this.className, 'update', 'Role not found', 404);
        }

        obj.updatedAt = new Date();
        return await this.repository.update(obj);
    }

    async delete(id: string): Promise<void> {
        const exists = await this.repository.findById(id);

        if (!exists) {
            throw new ErrorHelper(this.className, 'delete', 'Role not found', 404);
        }

        await this.repository.delete(id);
    }
}