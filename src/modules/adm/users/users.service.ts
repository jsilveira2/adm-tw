import { ErrorHelper } from '../../../helpers/error-helper';
import { UsersDb } from '@prisma/client';
import { IUsersRepositories } from './user.repositories';
import { User } from './schema';
import bcrypt from 'bcrypt';

export class UsersService {

	private readonly className = 'UsersService';
	constructor(private repository: IUsersRepositories) { }

	async findAll(): Promise<Omit<UsersDb, 'password'>[]> {
		return await this.repository.findAll();
	}

	async findById(id: string): Promise<Omit<UsersDb, 'password'>> {
		const data = await this.repository.findById(id);

		if (!data) {
			throw new ErrorHelper(this.className, 'findById', 'User not found', 404);
		}

		return data;
	}

	async findByEmail(email: string): Promise<UsersDb> {
		const data = await this.repository.findByEmail(email);

		if (!data) {
			throw new ErrorHelper(this.className, 'findByEmail', 'User not found', 404);
		}

		return data;
	}

	async create(obj: User): Promise<Omit<UsersDb, 'password'>> {
		const data = await this.repository.findByEmail(obj.email);

		if (data) {
			throw new ErrorHelper(this.className, 'create', 'User already exists', 400);
		}

		const password = await bcrypt.hash(obj.password, 10);
		obj.password = password;
		return await this.repository.save(obj);
	}

	async update(id: string, obj: User): Promise<Omit<UsersDb, 'password'>> {
		const exists = await this.repository.exists(id);

		if (!exists) {
			throw new ErrorHelper(this.className, 'update', 'User not found', 404);
		}

		obj.updatedAt = new Date();
		if (obj.password) {
			const password = await bcrypt.hash(obj.password, 10);
			obj.password = password;
		}
		
		return await this.repository.update(obj);
	}

	async delete(id: string): Promise<void> {
		const obj = await this.repository.findById(id);

		if (!obj) {
			throw new ErrorHelper(this.className, 'delete', 'User not found', 404);
		}

		obj.isActive = false;
		const dataToUpdate = {
			...obj,
			updatedAt: new Date(),
		};

		await this.repository.update(dataToUpdate);
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

	async login(email: string, password: string): Promise<Omit<UsersDb, 'password'>> {
		const data = await this.findByEmail(email);

		if (!data || !this.isValidPassword(password, data.password)) {
			data.loginAttempts = data.loginAttempts + 1;
			const dataToUpdate = {
				...data,
				updatedAt: new Date(),
			};
			await this.repository.update(dataToUpdate);

			throw new ErrorHelper(this.className, 'login', 'Invalid credentials', 404);
		}

		data.lastLogin = new Date();
		data.loginAttempts = 0;
		const dataToUpdate = {
			...data,
			updatedAt: new Date(),
		};
		await this.repository.update(dataToUpdate);

		return data;
	}
}