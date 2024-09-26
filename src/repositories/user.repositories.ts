import { Users } from '@prisma/client';
import { User } from '../modules/adm/users/schema';

export abstract class IUsersRepositories {
  abstract findByEmail(email: string): Promise<Users | null>;
  abstract findById(id: string): Promise<Users | null>;
  abstract exists(id: string): Promise<boolean>;
  abstract findAll(): Promise<Omit<Users, 'password'>[]>;
  abstract save(user: User): Promise<Omit<Users, 'password'>>;
  abstract update(user: User): Promise<Omit<Users, 'password'>>;
  abstract delete(id: string): Promise<void>;
}