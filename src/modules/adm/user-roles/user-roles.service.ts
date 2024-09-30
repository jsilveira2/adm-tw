import { ErrorHelper } from '../../../helpers/error-helper';
import { UserRolesDb } from '@prisma/client';
import { IUserRolesRepositories } from './user-roles.repositories';
import { ServiceBase } from '../../base/base.service';

export class UserRolesService extends ServiceBase<UserRolesDb, string> {
    constructor(repository: IUserRolesRepositories) {
        super(repository, 'UserRolesService');
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

    async deleteByUserId(userId: string): Promise<void> {
        await this.repository.deleteByUserId(userId);
    }

    async deleteByRoleId(roleId: string): Promise<void> {
        await this.repository.deleteByRoleId(roleId);
    }
}