import { ErrorHelper } from '../../../helpers/error-helper';
import { UserRolesDb } from '@prisma/client';
import { IUserRolesRepositories } from './user-roles.repositories';
import { ServiceBase } from '../../base/base.service';
import { UserRoles } from './schema';
import { UserPermissionsService } from '../user-permissions/user-permissions.service';
import { PermissionsService } from '../permissions/permissions.service';
import { UserPermissions } from '../user-permissions/schema';

export class UserRolesService extends ServiceBase<UserRolesDb, string> {

    private userPermissionService!: UserPermissionsService;
    private permissionService!: PermissionsService;

    constructor(public repository: IUserRolesRepositories) {
        super(repository, 'UserRolesService');
    }

    setDependencies(userPermissionService: UserPermissionsService, permissionService: PermissionsService) {
        this.userPermissionService = userPermissionService;
        this.permissionService = permissionService;
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

    async createMany(obj: UserRoles[]): Promise<UserRolesDb[]> {
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

            const roleIds = obj.map(o => o.roleId);
            const permissions = await this.permissionService.findByRoleIds(roleIds);
            const userPermissions: UserPermissions[] = [];
            for (const p of permissions) {
                userPermissions.push({
                    userId,
                    permissionId: p.id
                });
            }

            if (userPermissions && userPermissions.length > 0) {
                this.userPermissionService.createMany(userPermissions);
            }

            return data;
        } else {
            throw new ErrorHelper(this.className, 'createMany', 'Missing objects to save', 400);
        }
    }
}