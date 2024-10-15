import { describe, it, expect, vi, afterEach } from 'vitest';
import { UsersService } from '../../../../src/modules/adm/users/users.service';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { UsersDb } from '@prisma/client';
import { User } from '../../../../src/modules/adm/users/schema';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const mockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByEmail: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    exists: vi.fn(),
    delete: vi.fn()
};

const mockUser: UsersDb = {
    id: uuidv4(),
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    loginAttempts: 0,
    isLocked: false,
    lastLogin: null
};

const mockNewUser: UsersDb = {
    id: uuidv4(),
    name: 'Test New User',
    email: 'newtest@example.com',
    password: 'hashedPassword',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    loginAttempts: 0,
    isLocked: false,
    lastLogin: null
};

describe('UsersService', () => {
    const userService = new UsersService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find all users', async () => {
        const mockUsers: UsersDb[] = [mockUser];
        mockRepository.findAll.mockResolvedValue(mockUsers);

        const users = await userService.findAll();
        expect(users).toEqual(mockUsers);
        expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should find a user by ID', async () => {
        mockRepository.findById.mockResolvedValue(mockUser);

        const user = await userService.findById('1');
        expect(user).toEqual(mockUser);
        expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error when user is not found by ID', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(userService.findById('1')).rejects.toThrowError(new ErrorHelper('UsersService', 'findById', 'User not found', 404));
    });

    it('should create a new user', async () => {
        const newUser = mockNewUser;
        mockRepository.findByEmail.mockResolvedValue(null);
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        mockRepository.save.mockResolvedValue({ ...newUser, password: hashedPassword, id: '1', isActive: true, createdAt: new Date(), updatedAt: new Date(), loginAttempts: 0, isLocked: false });

        const createdUser = await userService.create(newUser);
        expect(createdUser.email).toEqual(newUser.email);
        expect(mockRepository.findByEmail).toHaveBeenCalledWith(newUser.email);
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when creating an existing user', async () => {
        const existingUser = mockUser;
        mockRepository.findByEmail.mockResolvedValue(existingUser);

        await expect(userService.create(existingUser)).rejects.toThrowError(new ErrorHelper('UsersService', 'create', 'User already exists', 400));
    });

    it('should update a user', async () => {
        const userToUpdate = mockUser;

        mockRepository.exists.mockResolvedValue(true);
        mockRepository.findById.mockResolvedValue(userToUpdate);
        mockRepository.update.mockResolvedValue({ ...userToUpdate, updatedAt: new Date() });

        const updatedUser = await userService.update(mockUser.id, userToUpdate);

        expect(updatedUser).toEqual(expect.objectContaining({
            id: mockUser.id,
            name: 'Test User',
            email: 'test@example.com',
            isActive: true,
            isLocked: false,
            lastLogin: null,
            loginAttempts: 0,
            password: expect.any(String)
        }));
    });

    it('should throw an error when updating a non-existent user', async () => {
        mockRepository.exists.mockResolvedValue(false);

        await expect(userService.update('1', {} as User)).rejects.toThrowError(new ErrorHelper('UsersService', 'update', 'User not found', 404));
    });

    it('should delete a user', async () => {
        const mockUser: UsersDb = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashedPassword',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            loginAttempts: 0,
            isLocked: false,
            lastLogin: null
        };
        mockRepository.findById.mockResolvedValue(mockUser);
        mockRepository.update.mockResolvedValue({ ...mockUser, isActive: false, updatedAt: new Date() });

        await userService.delete('1');
        expect(mockRepository.update).toHaveBeenCalledWith({ ...mockUser, isActive: false, updatedAt: expect.any(Date) });
    });

    it('should throw an error when deleting a non-existent user', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(userService.delete('1')).rejects.toThrowError(new ErrorHelper('UsersService', 'delete', 'User not found', 404));
    });

    it('should validate a password', async () => {
        const plainPassword = 'plainPassword';
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        const isValid = await userService.isValidPassword(plainPassword, hashedPassword);

        expect(isValid).toBe(true);
    });

    it('should throw an error when login credentials are invalid', async () => {
        mockRepository.findByEmail.mockResolvedValue(null);

        await expect(userService.login('test@example.com', 'wrongPassword')).rejects.toThrowError(new ErrorHelper('UsersService', 'login', 'Invalid credentials', 404));
    });

    it('should log in a user successfully', async () => {
        const mockUser: UsersDb = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            password: await bcrypt.hash('plainPassword', 10),
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            loginAttempts: 0,
            isLocked: false,
            lastLogin: null
        };
        mockRepository.findByEmail.mockResolvedValue(mockUser);
        const result = await userService.login(mockUser.email, 'plainPassword');

        expect(result).toEqual(mockUser);
        expect(mockRepository.update).toHaveBeenCalledWith({ ...mockUser, loginAttempts: 0, lastLogin: expect.any(Date), updatedAt: expect.any(Date) });
    });
});
