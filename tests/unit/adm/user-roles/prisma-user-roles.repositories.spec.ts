import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaUserRolesRepositories } from '../../../../src/repositories/prisma/adm/prisma-user-roles.repositories';
import { prisma } from '../../../../src/database/prisma';
import { UserRolesDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockUserRole: UserRolesDb = {
    id: uuidv4(),
    userId: uuidv4(),
    roleId: uuidv4(),
    createdAt: new Date()
};

const mockUserRoles: UserRolesDb[] = [
    mockUserRole,
    {
        id: uuidv4(),
        userId: uuidv4(),
        roleId: uuidv4(),
        createdAt: new Date()
    },
];

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        userRolesDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.userRolesDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.userRolesDb.deleteMany as ReturnType<typeof vi.fn>;

    vi.clearAllMocks();
});

describe('PrismaUserRolesRepositories', () => {
    let userRolesRepository: PrismaUserRolesRepositories;

    beforeEach(() => {
        userRolesRepository = new PrismaUserRolesRepositories();
    });

    it('should find user roles by userId', async () => {
        findManyMock.mockResolvedValue(mockUserRoles);

        const result = await userRolesRepository.findByUserId(mockUserRole.userId);
        expect(result).toEqual(mockUserRoles);
        expect(findManyMock).toHaveBeenCalledWith({ where: { userId: mockUserRole.userId } });
    });

    it('should find user roles by roleId', async () => {
        findManyMock.mockResolvedValue(mockUserRoles);

        const result = await userRolesRepository.findByRoleId(mockUserRole.roleId);
        expect(result).toEqual(mockUserRoles);
        expect(findManyMock).toHaveBeenCalledWith({ where: { roleId: mockUserRole.roleId } });
    });

    it('should delete user roles by userId', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await userRolesRepository.deleteByUserId(mockUserRole.userId);
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { userId: mockUserRole.userId } });
    });

    it('should delete user roles by roleId', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await userRolesRepository.deleteByRoleId(mockUserRole.roleId);
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { roleId: mockUserRole.roleId } });
    });
});
