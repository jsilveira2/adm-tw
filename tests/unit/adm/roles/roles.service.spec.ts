import { describe, it, expect, vi, afterEach } from 'vitest';
import { RolesService } from '../../../../src/modules/adm/roles/roles.service';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { RolesDb } from '@prisma/client';

const mockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockRole: RolesDb = {
    id: 'role1',
    name: 'Admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockRoles: RolesDb[] = [mockRole];

describe('RolesService', () => {
    const rolesService = new RolesService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find all roles', async () => {
        mockRepository.findAll.mockResolvedValue(mockRoles);

        const roles = await rolesService.findAll();
        expect(roles).toEqual(mockRoles);
        expect(mockRepository.findAll).toHaveBeenCalled();
    });

    it('should find role by id', async () => {
        mockRepository.findById.mockResolvedValue(mockRole);

        const role = await rolesService.findById('role1');
        expect(role).toEqual(mockRole);
        expect(mockRepository.findById).toHaveBeenCalledWith('role1');
    });

    it('should throw an error when no role found by id', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(rolesService.findById('role1')).rejects.toThrowError(
            new ErrorHelper('RolesService', 'findById', 'Object not found', 404)
        );
    });

    it('should create a new role', async () => {
        mockRepository.save.mockResolvedValue(mockRole);

        const role = await rolesService.create(mockRole);
        expect(role).toEqual(mockRole);
        expect(mockRepository.save).toHaveBeenCalledWith(mockRole);
    });

    it('should update a role', async () => {
        const updatedRole = { ...mockRole, name: 'Updated Role' };

        mockRepository.findById.mockResolvedValue(mockRole);
        mockRepository.update.mockResolvedValue(updatedRole);
    
        const role = await rolesService.update('role1', updatedRole);

        expect(role).toEqual(updatedRole);
        expect(mockRepository.findById).toHaveBeenCalledWith('role1');
        expect(mockRepository.update).toHaveBeenCalledWith(updatedRole);
    });
    
    it('should delete a role by id', async () => {
        mockRepository.findById.mockResolvedValue(mockRole);
        mockRepository.delete.mockResolvedValue(undefined);

        await rolesService.delete(mockRole.id);
        expect(mockRepository.delete).toHaveBeenCalledWith(mockRole.id);
    });
});
