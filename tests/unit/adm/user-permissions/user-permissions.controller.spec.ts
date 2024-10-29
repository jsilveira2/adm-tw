import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserPermissionsController } from '../../../../src/modules/adm/user-permissions/user-permissions.controller';
import { UserPermissionsService } from '../../../../src/modules/adm/user-permissions/user-permissions.service';

const mockService = {
    findByUserId: vi.fn(),
    findByPermissionId: vi.fn(),
    deleteByUserId: vi.fn(),
    deleteByPermissionId: vi.fn(),
};

const mockRequest = (params = {}) => ({
    params,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

describe('UserPermissionsController', () => {
    const controller = new UserPermissionsController(mockService as unknown as UserPermissionsService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if userId is not provided in getByUserId', async () => {
        const request = mockRequest({ userId: undefined });

        await controller.getByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid User ID');
    });

    it('should get user permissions by userId successfully', async () => {
        const userId = 'user123';
        const userPermissions = [{ permissionId: 'permission1' }, { permissionId: 'permission2' }];
        const request = mockRequest({ userId });
        mockService.findByUserId.mockResolvedValue(userPermissions);

        await controller.getByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(userPermissions);
        expect(mockService.findByUserId).toHaveBeenCalledWith(userId);
    });

    it('should return 400 if permissionId is not provided in getByPermissionId', async () => {
        const request = mockRequest({ permissionId: undefined });

        await controller.getByPermissionId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Permission ID');
    });

    it('should get user permissions by permissionId successfully', async () => {
        const permissionId = 'permission123';
        const userPermissions = [{ userId: 'user1' }, { userId: 'user2' }];
        const request = mockRequest({ permissionId });
        mockService.findByPermissionId.mockResolvedValue(userPermissions);

        await controller.getByPermissionId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(userPermissions);
        expect(mockService.findByPermissionId).toHaveBeenCalledWith(permissionId);
    });

    it('should return 400 if userId is not provided in deleteByUserId', async () => {
        const request = mockRequest({ userId: undefined });

        await controller.deleteByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid User ID');
    });

    it('should delete user permissions by userId successfully', async () => {
        const userId = 'user123';
        const request = mockRequest({ userId });

        await controller.deleteByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'UserPermission deleted with success' });
        expect(mockService.deleteByUserId).toHaveBeenCalledWith(userId);
    });

    it('should return 400 if permissionId is not provided in deleteByPermissionId', async () => {
        const request = mockRequest({ permissionId: undefined });

        await controller.deleteByPermissionId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Permission ID');
    });

    it('should delete user permissions by permissionId successfully', async () => {
        const permissionId = 'permission123';
        const request = mockRequest({ permissionId });

        await controller.deleteByPermissionId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'UserPermission deleted with success' });
        expect(mockService.deleteByPermissionId).toHaveBeenCalledWith(permissionId);
    });
});
