import { ErrorHelper } from '../../../helpers/error-helper';
import { prisma } from '../../../database/prisma';
import { Users } from '@prisma/client';
import { IUsersRepositories } from '../../../repositories/user.repositories';
import { User } from './schema';
import bcrypt from 'bcrypt';

export class UsersService {

  constructor(private repository: IUsersRepositories) { }

  async findAll(): Promise<Omit<Users, 'password'>[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Omit<Users, 'password'>> {
    const findUser = await this.repository.findById(id);

    if (!findUser) {
      throw new ErrorHelper('User not found', 404);
    }

    return findUser;
  }

  async findByEmail(email: string): Promise<Users> {
    const findUser = await this.repository.findByEmail(email);

    if (!findUser) {
      throw new ErrorHelper('User not found', 404);
    }

    return findUser;
  }

  async create(newUser: User): Promise<Omit<Users, 'password'>> {
    const findUser = await this.repository.findByEmail(newUser.email);

    if (findUser) {
      throw new ErrorHelper('User already exists', 400);
    }

    const password = await bcrypt.hash(newUser.password, 10);
    newUser.password = password;
    const user = await this.repository.save(newUser);

    return user;
  }

  async update(id: string, user: User): Promise<Omit<Users, 'password'>> {
    const exists = await this.repository.exists(id);

    if (!exists) {
      throw new ErrorHelper('User not found', 404);
    }

    const updateUser = await this.repository.update(user);

    return updateUser;
  }

  async delete(id: string): Promise<void> {
    const exists = await this.repository.exists(id);

    if (!exists) {
      throw new ErrorHelper('User not found', 404);
    }

    await prisma.users.delete({
      where: {
        id,
      },
    });
  }

  async isValidPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw new Error('Internal Server Error');
    }
  }

  async login(email: string, password: string): Promise<Omit<Users, 'password'>> {
    const user = await this.findByEmail(email);

    if (!user || !this.isValidPassword(password, user.password)) {
      throw new ErrorHelper('Invalid credentials', 404);
    }

    return user;
  }
}