import { Users } from '@prisma/client';
import { User } from '../../modules/adm/users/schema';
import { IUsersRepositories } from '../user.repositories';
import { prisma } from '../../database/prisma';

export class PrismaUserRepositories implements IUsersRepositories {

  async findByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({ where: { id } });
    return user;
  }

  async exists(id: string): Promise<boolean> {
    const user = await prisma.users.findUnique({ where: { id } });
    return !!user;
  }

  async findAll(): Promise<Omit<Users, 'password'>[]> {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
        loginAttempts: true,
        isLocked: true,
      },
    });

    return users;
  }

  async save(newUser: User): Promise<Omit<Users, 'password'>> {
    const user = await prisma.users.create({
      data: { ...newUser },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
        loginAttempts: true,
        isLocked: true,
      },
    });

    return user;
  }

  async update(attUser: User): Promise<Omit<Users, 'password'>> {
    const id = attUser.id;
    const user = await prisma.users.update({
      where: { id },
      data: { ...attUser },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
        loginAttempts: true,
        isLocked: true,
      },
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await prisma.users.delete({ where: { id } });
  }
}