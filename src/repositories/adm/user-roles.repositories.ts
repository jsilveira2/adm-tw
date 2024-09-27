import { UserRolesDb } from '@prisma/client';
import { UserRoles } from '../../modules/adm/user-roles/schema';

export abstract class IUserRolesRepositories {
    abstract findById(id: string): Promise<UserRolesDb | null>;
    abstract findByUserId(userId: string): Promise<UserRolesDb[]>;
    abstract findByRoleId(roleId: string): Promise<UserRolesDb[]>;
    abstract save(obj: UserRoles): Promise<UserRolesDb>;
    abstract delete(id: string): Promise<void>;
    abstract deleteByUserId(userId: string): Promise<void>;
    abstract deleteByRoleId(roleId: string): Promise<void>;
}