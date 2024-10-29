import { describe, it, expect, vi, afterEach } from 'vitest';
import { UserPermissionsService } from '../../../../src/modules/adm/user-permissions/user-permissions.service';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { UserPermissionsDb } from '@prisma/client';

const mockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findByUserId: vi.fn(),
    findByPermissionId: vi.fn(),
    deleteByUserId: vi.fn(),
    deleteByPermissionId: vi.fn()
};

const mockUserPermission: UserPermissionsDb = {
    id: '1',
    userId: 'user1',
    permissionId: 'permission1',
    createdAt: new Date()
};

const mockUserPermissions: UserPermissionsDb[] = [mockUserPermission];

describe('UserPermissionsService', () => {
    const service = new UserPermissionsService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find permissions by user ID', async () => {
        mockRepository.findByUserId.mockResolvedValue(mockUserPermissions);

        const permissions = await service.findByUserId('user1');
        expect(permissions).toEqual(mockUserPermissions);
        expect(mockRepository.findByUserId).toHaveBeenCalledWith('user1');
    });

    it('should throw an error when no permissions found by user ID', async () => {
        mockRepository.findByUserId.mockResolvedValue(null);

        await expect(service.findByUserId('user1')).rejects.toThrowError(
            new ErrorHelper('UserPermissionsService', 'findByUserId', 'UserPermissions not found', 404)
        );
    });

    it('should find permissions by permission ID', async () => {
        mockRepository.findByPermissionId.mockResolvedValue(mockUserPermission);

        const permissions = await service.findByPermissionId('permission1');
        expect(permissions).toEqual(mockUserPermission);
        expect(mockRepository.findByPermissionId).toHaveBeenCalledWith('permission1');
    });

    it('should throw an error when no permissions found by permission ID', async () => {
        mockRepository.findByPermissionId.mockResolvedValue(null);

        await expect(service.findByPermissionId('permission1')).rejects.toThrowError(
            new ErrorHelper('UserPermissionsService', 'findByPermissionId', 'UserPermissions not found', 404)
        );
    });

    it('should delete permissions by user ID', async () => {
        mockRepository.deleteByUserId.mockResolvedValue(undefined);

        await service.deleteByUserId('user1');
        expect(mockRepository.deleteByUserId).toHaveBeenCalledWith('user1');
    });

    it('should delete permissions by permission ID', async () => {
        mockRepository.deleteByPermissionId.mockResolvedValue(undefined);

        await service.deleteByPermissionId('permission1');
        expect(mockRepository.deleteByPermissionId).toHaveBeenCalledWith('permission1');
    });
});
