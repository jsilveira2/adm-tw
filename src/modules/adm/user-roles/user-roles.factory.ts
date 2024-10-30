import { PrismaUserRolesRepositories } from '../../../repositories/prisma/adm/prisma-user-roles.repositories';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import { UserPermissionsService } from '../user-permissions/user-permissions.service';
import { PermissionsService } from '../permissions/permissions.service';
import { PrismaUserPermissionsRepositories } from '../../../repositories/prisma/adm/prisma-user-permissions.repositories';
import { PrismaPermissionsRepositories } from '../../../repositories/prisma/adm/prisma-permissions.repositories';

class UserRolesFactory {
    createControllerService(): UserRolesController {
        const repository = new PrismaUserRolesRepositories();
        const userRolesService = new UserRolesService(repository);
        
        const userPermissionRepository = new PrismaUserPermissionsRepositories();
        const userPermissionService = new UserPermissionsService(userPermissionRepository);
        const permissionRepository = new PrismaPermissionsRepositories();
        const permissionService = new PermissionsService(permissionRepository);

        userRolesService.setDependencies(userPermissionService, permissionService);

        const controller = new UserRolesController(userRolesService);
        return controller;
    }
}

export const userRolesFactory = new UserRolesFactory().createControllerService();
