import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaPermissionsRepositories } from '../../../../src/repositories/prisma/adm/prisma-permissions.repositories';
import { prisma } from '../../../../src/database/prisma';
import { PermissionsDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockPermission: PermissionsDb = {
    id: uuidv4(),
    roleId: uuidv4(),
    name: 'CREATE_USER',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockPermissions: PermissionsDb[] = [
    mockPermission,
    {
        id: uuidv4(),
        roleId: uuidv4(),
        name: 'DELETE_USER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        permissionsDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.permissionsDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.permissionsDb.deleteMany as ReturnType<typeof vi.fn>;

    vi.clearAllMocks();
});

describe('PrismaPermissionsRepositories', () => {
    let permissionsRepository: PrismaPermissionsRepositories;

    beforeEach(() => {
        permissionsRepository = new PrismaPermissionsRepositories();
    });

    it('should find permissions by role id', async () => {
        findManyMock.mockResolvedValue(mockPermissions);

        const result = await permissionsRepository.findByRoleId(mockPermission.roleId);
        expect(result).toEqual(mockPermissions);
        expect(findManyMock).toHaveBeenCalledWith({ where: { roleId: mockPermission.roleId } });
    });

    it('should delete permissions by role id', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await permissionsRepository.deleteByRoleId(mockPermission.roleId);
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { roleId: mockPermission.roleId } });
    });
});
