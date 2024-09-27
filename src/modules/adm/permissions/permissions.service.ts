import { ErrorHelper } from '../../../helpers/error-helper';
import { PermissionsDb } from '@prisma/client';
import { Permission } from './schema';
import { IPermissionsRepositories } from '../../../repositories/adm/permissions.repositories';

export class PermissionsService {

    private readonly className = 'PermissionsService';

    constructor(private repository: IPermissionsRepositories) { }

    async findById(id: string): Promise<PermissionsDb> {
        const findData = await this.repository.findById(id);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findById', 'Permission not found', 404);
        }

        return findData;
    }

    async findByRoleId(roleId: string): Promise<PermissionsDb[]> {
        const findData = await this.repository.findByRoleId(roleId);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findByRoleId', 'Permissions not found', 404);
        }

        return findData;
    }

    async create(obj: Permission): Promise<PermissionsDb> {
        const data = await this.repository.save(obj);

        return data;
    }

    async update(id: string, obj: Permission): Promise<PermissionsDb> {
        const exists = await this.repository.findById(id);

        if (!exists) {
            throw new ErrorHelper(this.className, 'update', 'Permission not found', 404);
        }

        obj.updatedAt = new Date();
        return await this.repository.update(obj);
    }

    async delete(id: string): Promise<void> {
        const exists = await this.repository.findById(id);

        if (!exists) {
            throw new ErrorHelper(this.className, 'delete', 'Permission not found', 404);
        }

        await this.repository.delete(id);
    }
}