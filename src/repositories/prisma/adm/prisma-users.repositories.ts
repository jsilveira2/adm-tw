import { UsersDb } from '@prisma/client';
import { User } from '../../../modules/adm/users/schema';
import { IUsersRepositories } from '../../adm/user.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaUserRepositories implements IUsersRepositories {

	private readonly db = prisma.usersDb;

	async findByEmail(email: string): Promise<UsersDb | null> {
		const user = await await this.db.findUnique({ where: { email } });
		return user;
	}

	async findById(id: string): Promise<UsersDb | null> {
		const user = await await this.db.findUnique({ where: { id } });
		return user;
	}

	async exists(id: string): Promise<boolean> {
		const user = await await this.db.findUnique({ where: { id } });
		return !!user;
	}

	async findAll(): Promise<Omit<UsersDb, 'password'>[]> {
		const users = await await this.db.findMany({
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

	async save(newUser: User): Promise<Omit<UsersDb, 'password'>> {
		const user = await await this.db.create({
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

	async update(attUser: User): Promise<Omit<UsersDb, 'password'>> {
		const id = attUser.id;
		const user = await await this.db.update({
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
		await await this.db.delete({ where: { id } });
	}
}