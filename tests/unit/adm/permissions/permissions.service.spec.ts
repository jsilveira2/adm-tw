import { describe, it, expect, vi, afterEach } from 'vitest';
import { PermissionsService } from '../../../../src/modules/adm/permissions/permissions.service';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { PermissionsDb } from '@prisma/client';

const mockRepository = {
    findByRoleId: vi.fn(),
    deleteByRoleId: vi.fn(),
    findAll: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockPermission: PermissionsDb = {
    id: 'permission1',
    roleId: 'role1',
    name: 'CREATE_USER',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockPermissions: PermissionsDb[] = [mockPermission];

describe('PermissionsService', () => {
    const permissionsService = new PermissionsService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find permissions by role id', async () => {
        mockRepository.findByRoleId.mockResolvedValue(mockPermissions);

        const permissions = await permissionsService.findByRoleId('role1');
        expect(permissions).toEqual(mockPermissions);
        expect(mockRepository.findByRoleId).toHaveBeenCalledWith('role1');
    });

    it('should throw an error when no permissions found by role id', async () => {
        mockRepository.findByRoleId.mockResolvedValue([]);

        await expect(permissionsService.findByRoleId('role1')).rejects.toThrowError(
            new ErrorHelper('PermissionsService', 'findByRoleId', 'Permissions not found', 404)
        );
    });

    it('should delete permissions by role id', async () => {
        mockRepository.deleteByRoleId.mockResolvedValue(undefined);

        await permissionsService.deleteByRoleId('role1');
        expect(mockRepository.deleteByRoleId).toHaveBeenCalledWith('role1');
    });
});
