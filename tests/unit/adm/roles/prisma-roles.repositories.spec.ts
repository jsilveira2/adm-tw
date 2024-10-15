import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaRolesRepositories } from '../../../../src/repositories/prisma/adm/prisma-roles.repositories';
import { prisma } from '../../../../src/database/prisma';
import { RolesDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockRole: RolesDb = {
    id: uuidv4(),
    name: 'Admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockRoles: RolesDb[] = [
    mockRole,
    {
        id: uuidv4(),
        name: 'User',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const newRole = {
    id: uuidv4(),
    name: 'New Role',
    description: 'Description of new role',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};

let findManyMock: ReturnType<typeof vi.fn>;
let findUniqueMock: ReturnType<typeof vi.fn>;
let createMock: ReturnType<typeof vi.fn>;
let updateMock: ReturnType<typeof vi.fn>;
let deleteMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        rolesDb: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.rolesDb.findMany as ReturnType<typeof vi.fn>;
    findUniqueMock = prisma.rolesDb.findUnique as ReturnType<typeof vi.fn>;
    createMock = prisma.rolesDb.create as ReturnType<typeof vi.fn>;
    updateMock = prisma.rolesDb.update as ReturnType<typeof vi.fn>;
    deleteMock = prisma.rolesDb.delete as ReturnType<typeof vi.fn>;

    vi.clearAllMocks();
});

describe('PrismaRolesRepositories', () => {
    let rolesRepository: PrismaRolesRepositories;

    beforeEach(() => {
        rolesRepository = new PrismaRolesRepositories();
    });

    it('should find all roles', async () => {
        findManyMock.mockResolvedValue(mockRoles);

        const result = await rolesRepository.findAll();
        expect(result).toEqual(mockRoles);
        expect(findManyMock).toHaveBeenCalled();
    });

    it('should find role by id', async () => {
        findUniqueMock.mockResolvedValue(mockRole);

        const result = await rolesRepository.findById(mockRole.id);
        expect(result).toEqual(mockRole);
        expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: mockRole.id } });
    });

    it('should create a new role', async () => {
        createMock.mockResolvedValue(mockRole);

        const result = await rolesRepository.save(newRole);
        expect(result).toEqual(mockRole);
        expect(createMock).toHaveBeenCalledWith({
            data: newRole,
        });
    });

    it('should update a role', async () => {
        const updatedRole = { ...mockRole, name: 'Updated Role' };
        updateMock.mockResolvedValue(updatedRole);
        newRole.name = 'Updated Role';
        const result = await rolesRepository.update(newRole);
        expect(result).toEqual(updatedRole);
        expect(updateMock).toHaveBeenCalledWith({
            where: { id: newRole.id },
            data: newRole,
        });
    });

    it('should delete a role by id', async () => {
        deleteMock.mockResolvedValue(mockRole);

        await rolesRepository.delete(mockRole.id);
        expect(deleteMock).toHaveBeenCalledWith({ where: { id: mockRole.id } });
    });
});
