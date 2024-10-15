import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserRolesController } from '../../../../src/modules/adm/user-roles/user-roles.controller';
import { UserRolesService } from '../../../../src/modules/adm/user-roles/user-roles.service';

const mockService = {
    findByUserId: vi.fn(),
    findByRoleId: vi.fn(),
    deleteByUserId: vi.fn(),
    deleteByRoleId: vi.fn(),
};

const mockRequest = (params = {}) => ({
    params,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

describe('UserRolesController', () => {
    const userRolesController = new UserRolesController(mockService as unknown as UserRolesService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if userId is not provided in getByUserId', async () => {
        const request = mockRequest({ userId: undefined });

        await userRolesController.getByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid User ID');
    });

    it('should get user roles by userId successfully', async () => {
        const userId = 'user123';
        const userRoles = [{ roleId: 'role1' }, { roleId: 'role2' }];
        const request = mockRequest({ userId });
        mockService.findByUserId.mockResolvedValue(userRoles);

        await userRolesController.getByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(userRoles);
        expect(mockService.findByUserId).toHaveBeenCalledWith(userId);
    });

    it('should return 400 if roleId is not provided in getByRoleId', async () => {
        const request = mockRequest({ roleId: undefined });

        await userRolesController.getByRoleId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Role ID');
    });

    it('should get user roles by roleId successfully', async () => {
        const roleId = 'role123';
        const userRoles = [{ userId: 'user1' }, { userId: 'user2' }];
        const request = mockRequest({ roleId });
        mockService.findByRoleId.mockResolvedValue(userRoles);

        await userRolesController.getByRoleId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(userRoles);
        expect(mockService.findByRoleId).toHaveBeenCalledWith(roleId);
    });

    it('should return 400 if userId is not provided in deleteByUserId', async () => {
        const request = mockRequest({ userId: undefined });

        await userRolesController.deleteByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid User ID');
    });

    it('should delete user roles by userId successfully', async () => {
        const userId = 'user123';
        const request = mockRequest({ userId });

        await userRolesController.deleteByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'UserRole deleted with success' });
        expect(mockService.deleteByUserId).toHaveBeenCalledWith(userId);
    });

    it('should return 400 if roleId is not provided in deleteByRoleId', async () => {
        const request = mockRequest({ roleId: undefined });

        await userRolesController.deleteByRoleId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Role ID');
    });

    it('should delete user roles by roleId successfully', async () => {
        const roleId = 'role123';
        const request = mockRequest({ roleId });

        await userRolesController.deleteByRoleId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'UserRole deleted with success' });
        expect(mockService.deleteByRoleId).toHaveBeenCalledWith(roleId);
    });
});
