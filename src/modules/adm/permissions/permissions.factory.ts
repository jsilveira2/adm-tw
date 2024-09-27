import { PrismaPermissionsRepositories } from '../../../repositories/prisma/adm/prisma-permissions.repositories';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

const PermissionFactory = () => {
  const prismaRepositories = new PrismaPermissionsRepositories();
  const service = new PermissionsService(prismaRepositories);

  const controller = new PermissionsController(service);
  return controller;
}

export const permissionFactory = PermissionFactory();