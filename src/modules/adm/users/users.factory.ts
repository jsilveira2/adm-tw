import { PrismaUserRepositories } from '../../../repositories/prisma/adm/prisma-users.repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const UserFactory = () => {
  const prismaRepositories = new PrismaUserRepositories();
  const service = new UsersService(prismaRepositories);

  const controller = new UsersController(service);
  return controller;
}

export const userFactory = UserFactory();