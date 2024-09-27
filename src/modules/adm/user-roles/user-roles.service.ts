import { ErrorHelper } from '../../../helpers/error-helper';
import { UserRolesDb } from '@prisma/client';
import { UserRoles } from './schema';
import { IUserRolesRepositories } from '../../../repositories/adm/user-roles.repositories';

export class UserRolesService {

    private readonly className = 'UserRolesService';

    constructor(private repository: IUserRolesRepositories) { }

    async findById(id: string): Promise<UserRolesDb> {
        const findData = await this.repository.findById(id);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findById', 'UserRole not found', 404);
        }

        return findData;
    }

    async findByUserId(userId: string): Promise<UserRolesDb[]> {
        const findData = await this.repository.findByUserId(userId);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findByUserId', 'UserRoles not found', 404);
        }

        return findData;
    }

    async findByRoleId(roleId: string): Promise<UserRolesDb[]> {
        const findData = await this.repository.findByRoleId(roleId);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findByRoleId', 'UserRoles not found', 404);
        }

        return findData;
    }

    async create(obj: UserRoles): Promise<UserRolesDb> {
        const data = await this.repository.save(obj);

        return data;
    }

    async delete(id: string): Promise<void> {
        const exists = await this.repository.findById(id);

        if (!exists) {
            throw new ErrorHelper(this.className, 'delete', 'UserRole not found', 404);
        }

        await this.repository.delete(id);
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.repository.deleteByUserId(userId);
    }

    async deleteByRoleId(roleId: string): Promise<void> {
        await this.repository.deleteByRoleId(roleId);
    }
}