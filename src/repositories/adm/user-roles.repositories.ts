import { UserRolesDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';

export abstract class IUserRolesRepositories extends IBaseRepositories<UserRolesDb, string> {
    abstract findByUserId(userId: string): Promise<UserRolesDb[]>;
    abstract findByRoleId(roleId: string): Promise<UserRolesDb[]>;
    abstract deleteByUserId(userId: string): Promise<void>;
    abstract deleteByRoleId(roleId: string): Promise<void>;
}