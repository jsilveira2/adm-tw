import { UsersDb } from '@prisma/client';
import { User, UserUpdate } from './schema';

export abstract class IUsersRepositories {
	abstract findByEmail(email: string, onlyActives?: boolean): Promise<UsersDb | null>;
	abstract findById(id: string, onlyActives?: boolean): Promise<UsersDb | null>;
	abstract exists(id: string): Promise<boolean>;
	abstract findAll(onlyActives?: boolean): Promise<Omit<UsersDb, 'password'>[]>;
	abstract save(user: User): Promise<Omit<UsersDb, 'password'>>;
	abstract update(user: UserUpdate): Promise<Omit<UsersDb, 'password'>>;
	abstract delete(id: string): Promise<void>;
}