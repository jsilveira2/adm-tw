import { PrismaUserRepositories } from '../../../repositories/prisma/adm/prisma-users.repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FactoryBase } from '../../base/base.factory';

class UserFactory extends FactoryBase<UsersController, UsersService, PrismaUserRepositories> {
    constructor() {
        super(PrismaUserRepositories, UsersService, UsersController);
    }
}

export const userFactory = new UserFactory().createControllerService();