import { PrismaUserRepositories } from '../../../repositories/prisma/prisma-users.repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const UserFactory = () => {
  const prismaUserRepositories = new PrismaUserRepositories();
  const userService = new UsersService(prismaUserRepositories);

  const userController = new UsersController(userService);
  return userController;
}

export const userFactory = UserFactory();