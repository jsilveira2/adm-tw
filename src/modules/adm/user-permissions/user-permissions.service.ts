import { ErrorHelper } from '../../../helpers/error-helper';
import { UserPermissionsDb } from '@prisma/client';
import { IUserPermissionsRepositories } from './user-permissions.repositories';
import { ServiceBase } from '../../base/base.service';
import { UserPermissions } from './schema';

export class UserPermissionsService extends ServiceBase<UserPermissionsDb, string> {
    constructor(public readonly repository: IUserPermissionsRepositories) {
        super(repository, 'UserPermissionsService');
    }

    async findByUserId(userId: string): Promise<UserPermissionsDb[]> {
        const findData = await this.repository.findByUserId(userId);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findByUserId', 'UserPermissions not found', 404);
        }

        return findData;
    }

    async findByPermissionId(permissionId: string): Promise<UserPermissionsDb[]> {
        const findData = await this.repository.findByPermissionId(permissionId);

        if (!findData) {
            throw new ErrorHelper(this.className, 'findByPermissionId', 'UserPermissions not found', 404);
        }

        return findData;
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.repository.deleteByUserId(userId);
    }

    async deleteByPermissionId(permissionId: string): Promise<void> {
        await this.repository.deleteByPermissionId(permissionId);
    }

    async createMany(obj: UserPermissions[]): Promise<UserPermissionsDb[]> {
        if (obj && obj.length > 0) {
            const userId = obj[0].userId;
            if (!userId) {
                throw new ErrorHelper(this.className, 'createMany', 'Invalid User ID', 400);
            }

            await this.deleteByUserId(userId);
            const data = await this.repository.createMany(obj);
            if (!data) {
                throw new ErrorHelper(this.className, 'createMany', 'Fail to create UserRole', 400);
            }

            return data;
        } else {
            throw new ErrorHelper(this.className, 'createMany', 'Missing objects to save', 400);
        }
    }
}