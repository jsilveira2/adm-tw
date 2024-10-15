import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaUserRepositories } from '../../../../src/repositories/prisma/adm/prisma-users.repositories';
import { prisma } from '../../../../src/database/prisma';
import { UsersDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

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

let findUniqueMock: ReturnType<typeof vi.fn>;
let findManyMock: ReturnType<typeof vi.fn>;
let createMock: ReturnType<typeof vi.fn>;
let updateMock: ReturnType<typeof vi.fn>;
let deleteMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        usersDb: {
            findUnique: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findUniqueMock = prisma.usersDb.findUnique as ReturnType<typeof vi.fn>;
    findManyMock = prisma.usersDb.findMany as ReturnType<typeof vi.fn>;
    createMock = prisma.usersDb.create as ReturnType<typeof vi.fn>;
    updateMock = prisma.usersDb.update as ReturnType<typeof vi.fn>;
    deleteMock = prisma.usersDb.delete as ReturnType<typeof vi.fn>;

    vi.clearAllMocks();
});

describe('PrismaUserRepositories', () => {
    let userRepository: PrismaUserRepositories;

    beforeEach(() => {
        userRepository = new PrismaUserRepositories();
    });

    it('should find user by id', async () => {
        const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };

        findUniqueMock.mockResolvedValue(mockUser);

        const result = await userRepository.findById('1');
        expect(result).toEqual(mockUser);
        expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should check if user exists by id', async () => {
        findUniqueMock.mockResolvedValue({ id: '1' });

        const result = await userRepository.exists('1');
        expect(result).toBe(true);
        expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return false if user does not exist', async () => {
        findUniqueMock.mockResolvedValue(null);

        const result = await userRepository.exists('non-existent-id');
        expect(result).toBe(false);
        expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: 'non-existent-id' } });
    });

    it('should find all users', async () => {
        const mockUsers = [
            { id: '1', email: 'user1@example.com', name: 'User 1' },
            { id: '2', email: 'user2@example.com', name: 'User 2' },
        ];

        findManyMock.mockResolvedValue(mockUsers);

        const result = await userRepository.findAll();
        expect(result).toEqual(mockUsers);
        expect(findManyMock).toHaveBeenCalled();
    });

    it('should save a new user', async () => {
        const newUser = mockNewUser;
        const createdUser = { ...newUser, password: undefined };

        createMock.mockResolvedValue(createdUser);

        const result = await userRepository.save(newUser);
        expect(result).toEqual(createdUser);
        expect(createMock).toHaveBeenCalledWith({
            data: newUser,
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
    });

    it('should update an existing user', async () => {
        const updatedUser = mockUser;

        updateMock.mockResolvedValue(updatedUser);

        const result = await userRepository.update(updatedUser);
        expect(result).toEqual(updatedUser);
        expect(updateMock).toHaveBeenCalledWith({
            where: { id: updatedUser.id },
            data: updatedUser,
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
    });

    it('should delete a user by id', async () => {
        deleteMock.mockResolvedValue({ id: '1' });

        await userRepository.delete('1');
        expect(deleteMock).toHaveBeenCalledWith({ where: { id: '1' } });
    });
});

