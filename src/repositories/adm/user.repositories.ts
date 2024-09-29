import { UsersDb } from '@prisma/client';
import { User } from '../../modules/adm/users/schema';

export abstract class IUsersRepositories {
	abstract findByEmail(email: string): Promise<UsersDb | null>;
	abstract findById(id: string): Promise<UsersDb | null>;
	abstract exists(id: string): Promise<boolean>;
	abstract findAll(): Promise<Omit<UsersDb, 'password'>[]>;
	abstract save(user: User): Promise<Omit<UsersDb, 'password'>>;
	abstract update(user: User): Promise<Omit<UsersDb, 'password'>>;
	abstract delete(id: string): Promise<void>;
}