import { UserPermissionsDb } from '@prisma/client';
import { IBaseRepositories } from '../../base/base.repositories';

export abstract class IUserPermissionsRepositories extends IBaseRepositories<UserPermissionsDb, string> {
    abstract findByUserId(userId: string): Promise<UserPermissionsDb[]>;
    abstract findByPermissionId(permissionId: string): Promise<UserPermissionsDb[]>;
    abstract deleteByUserId(userId: string): Promise<void>;
    abstract deleteByPermissionId(permissionId: string): Promise<void>;
}