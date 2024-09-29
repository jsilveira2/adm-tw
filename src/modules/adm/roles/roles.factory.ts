import { PrismaRolesRepositories } from '../../../repositories/prisma/adm/prisma-roles.repositories';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { FactoryBase } from '../../base/base.factory';

class RoleFactory extends FactoryBase<RolesController, RolesService, PrismaRolesRepositories> {
    constructor() {
        super(PrismaRolesRepositories, RolesService, RolesController);
    }
}

export const rolesFactory = new RoleFactory().createControllerService();