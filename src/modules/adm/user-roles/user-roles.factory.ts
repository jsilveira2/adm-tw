import { PrismaUserRolesRepositories } from '../../../repositories/prisma/adm/prisma-user-roles.repositories';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import { FactoryBase } from '../../base/base.factory';

class UserRolesFactory extends FactoryBase<UserRolesController, UserRolesService, PrismaUserRolesRepositories> {
    constructor() {
        super(PrismaUserRolesRepositories, UserRolesService, UserRolesController);
    }
}

export const userRolesFactory = new UserRolesFactory().createControllerService();