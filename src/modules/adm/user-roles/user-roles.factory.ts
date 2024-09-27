import { PrismaUserRolesRepositories } from '../../../repositories/prisma/adm/prisma-user-roles.repositories';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';

const UserRolesFactory = () => {
  const prismaRepositories = new PrismaUserRolesRepositories();
  const service = new UserRolesService(prismaRepositories);

  const controller = new UserRolesController(service);
  return controller;
}

export const userRolesFactory = UserRolesFactory();