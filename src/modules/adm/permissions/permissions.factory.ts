import { PrismaPermissionsRepositories } from '../../../repositories/prisma/adm/prisma-permissions.repositories';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { FactoryBase } from '../../base/base.factory';

class PermissionFactory extends FactoryBase<PermissionsController, PermissionsService, PrismaPermissionsRepositories> {
    constructor() {
        super(PrismaPermissionsRepositories, PermissionsService, PermissionsController);
    }
}

export const permissionFactory = new PermissionFactory().createControllerService();