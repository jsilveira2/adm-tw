import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaUserPermissionsRepositories } from '../../../../src/repositories/prisma/adm/prisma-user-permissions.repositories';
import { prisma } from '../../../../src/database/prisma';
import { UserPermissionsDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockUserPermission: UserPermissionsDb = {
    id: uuidv4(),
    userId: uuidv4(),
    permissionId: uuidv4(),
    createdAt: new Date()
};

const mockUserPermissions: UserPermissionsDb[] = [
    mockUserPermission,
    {
        id: uuidv4(),
        userId: uuidv4(),
        permissionId: uuidv4(),
        createdAt: new Date()
    },
];

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        userPermissionsDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.userPermissionsDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.userPermissionsDb.deleteMany as ReturnType<typeof vi.fn>;

    vi.clearAllMocks();
});

describe('PrismaUserPermissionsRepositories', () => {
    let userPermissionsRepository: PrismaUserPermissionsRepositories;

    beforeEach(() => {
        userPermissionsRepository = new PrismaUserPermissionsRepositories();
    });

    it('should find user permissions by userId', async () => {
        findManyMock.mockResolvedValue(mockUserPermissions);

        const result = await userPermissionsRepository.findByUserId(mockUserPermission.userId);
        expect(result).toEqual(mockUserPermissions);
        expect(findManyMock).toHaveBeenCalledWith({ where: { userId: mockUserPermission.userId } });
    });

    it('should find user permissions by permissionId', async () => {
        findManyMock.mockResolvedValue(mockUserPermissions);

        const result = await userPermissionsRepository.findByPermissionId(mockUserPermission.permissionId);
        expect(result).toEqual(mockUserPermissions);
        expect(findManyMock).toHaveBeenCalledWith({ where: { permissionId: mockUserPermission.permissionId } });
    });

    it('should delete user permissions by userId', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await userPermissionsRepository.deleteByUserId(mockUserPermission.userId);
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { userId: mockUserPermission.userId } });
    });

    it('should delete user permissions by permissionId', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await userPermissionsRepository.deleteByPermissionId(mockUserPermission.permissionId);
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { permissionId: mockUserPermission.permissionId } });
    });
});
