import { UsersDb } from '@prisma/client';
import { User, UserUpdate } from '../../../modules/adm/users/schema';
import { IUsersRepositories } from '../../../modules/adm/users/user.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaUserRepositories implements IUsersRepositories {

	private readonly db = prisma.usersDb;

	async findByEmail(email: string): Promise<UsersDb | null> {
		const user = await await this.db.findUnique({ where: { email } });
		return user;
	}

	async findById(id: string): Promise<UsersDb | null> {
		const user = await await this.db.findUnique({ where: { id } });
		if (user) {
			const { password, ...userWithoutPassword } = user;
			return userWithoutPassword as UsersDb;
		}

		return null;
	}

	async exists(id: string): Promise<boolean> {
		const user = await await this.db.findUnique({ where: { id } });
		return !!user;
	}

	async findAll(onlyActives: boolean = true): Promise<Omit<UsersDb, 'password'>[]> {
		const select = {
			id: true,
			email: true,
			name: true,
			isActive: true,
			createdAt: true,
			updatedAt: true,
			lastLogin: true,
			loginAttempts: true,
			isLocked: true,
		};

		if (!onlyActives) {
			return await this.db.findMany({select});
		}

		return await this.db.findMany({
			where: { isActive: true },
			select
		});
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

	async update(attUser: UserUpdate): Promise<Omit<UsersDb, 'password'>> {
		const id = attUser.id;
		const { password, ...data } = attUser;
		const updateData = password
        ? { ...data, password }
        : data;
		const user = await await this.db.update({
			where: { id },
			data: updateData,
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