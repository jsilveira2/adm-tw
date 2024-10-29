import { PrismaUserPermissionsRepositories } from '../../../repositories/prisma/adm/prisma-user-permissions.repositories';
import { UserPermissionsController } from './user-permissions.controller';
import { UserPermissionsService } from './user-permissions.service';
import { FactoryBase } from '../../base/base.factory';

class UserPermissionsFactory extends FactoryBase<UserPermissionsController, UserPermissionsService, PrismaUserPermissionsRepositories> {
    constructor() {
        super(PrismaUserPermissionsRepositories, UserPermissionsService, UserPermissionsController);
    }
}

export const userPermissionsFactory = new UserPermissionsFactory().createControllerService();