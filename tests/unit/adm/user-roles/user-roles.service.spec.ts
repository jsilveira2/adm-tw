import { describe, it, expect, vi, afterEach } from 'vitest';
import { UserRolesService } from '../../../../src/modules/adm/user-roles/user-roles.service';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { UserRolesDb } from '@prisma/client';

const mockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findByUserId: vi.fn(),
    findByRoleId: vi.fn(),
    deleteByUserId: vi.fn(),
    deleteByRoleId: vi.fn()
};

const mockUserRole: UserRolesDb = {
    id: '1',
    userId: 'user1',
    roleId: 'role1',
    createdAt: new Date()
};

const mockUserRoles: UserRolesDb[] = [mockUserRole];

describe('UserRolesService', () => {
    const userRolesService = new UserRolesService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find roles by user ID', async () => {
        mockRepository.findByUserId.mockResolvedValue(mockUserRoles);

        const roles = await userRolesService.findByUserId('user1');
        expect(roles).toEqual(mockUserRoles);
        expect(mockRepository.findByUserId).toHaveBeenCalledWith('user1');
    });

    it('should throw an error when no roles found by user ID', async () => {
        mockRepository.findByUserId.mockResolvedValue(null);

        await expect(userRolesService.findByUserId('user1')).rejects.toThrowError(
            new ErrorHelper('UserRolesService', 'findByUserId', 'UserRoles not found', 404)
        );
    });

    it('should find roles by role ID', async () => {
        mockRepository.findByRoleId.mockResolvedValue(mockUserRoles);

        const roles = await userRolesService.findByRoleId('role1');
        expect(roles).toEqual(mockUserRoles);
        expect(mockRepository.findByRoleId).toHaveBeenCalledWith('role1');
    });

    it('should throw an error when no roles found by role ID', async () => {
        mockRepository.findByRoleId.mockResolvedValue(null);

        await expect(userRolesService.findByRoleId('role1')).rejects.toThrowError(
            new ErrorHelper('UserRolesService', 'findByRoleId', 'UserRoles not found', 404)
        );
    });

    it('should delete roles by user ID', async () => {
        mockRepository.deleteByUserId.mockResolvedValue(undefined);

        await userRolesService.deleteByUserId('user1');
        expect(mockRepository.deleteByUserId).toHaveBeenCalledWith('user1');
    });

    it('should delete roles by role ID', async () => {
        mockRepository.deleteByRoleId.mockResolvedValue(undefined);

        await userRolesService.deleteByRoleId('role1');
        expect(mockRepository.deleteByRoleId).toHaveBeenCalledWith('role1');
    });
});
