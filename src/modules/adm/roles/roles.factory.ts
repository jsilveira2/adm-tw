import { PrismaRolesRepositories } from '../../../repositories/prisma/adm/prisma-roles.repositories';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

const RoleFactory = () => {
  const prismaRepositories = new PrismaRolesRepositories();
  const service = new RolesService(prismaRepositories);

  const controller = new RolesController(service);
  return controller;
}

export const roleFactory = RoleFactory();