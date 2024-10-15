import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PermissionsController } from '../../../../src/modules/adm/permissions/permissions.controller';
import { PermissionsService } from '../../../../src/modules/adm/permissions/permissions.service';
import { v4 as uuidv4 } from 'uuid';
import { PermissionsDb } from '@prisma/client';

const mockService = {
    findByRoleId: vi.fn(),
    deleteByRoleId: vi.fn(),
};

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

describe('PermissionsController', () => {
    const permissionsController = new PermissionsController(mockService as unknown as PermissionsService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if roleId is not provided in getByRoleId', async () => {
        const request = mockRequest({ roleId: undefined });

        await permissionsController.getByRoleId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Role ID');
    });

    it('should get permissions by roleId successfully', async () => {
        const roleId = uuidv4();
        const permissions: PermissionsDb[] = [
            { id: 'permission1', roleId, name: 'CREATE_USER', isActive: true, createdAt: new Date(), updatedAt: new Date() },
        ];
        const request = mockRequest({ roleId });
        mockService.findByRoleId.mockResolvedValue(permissions);

        await permissionsController.getByRoleId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(permissions);
        expect(mockService.findByRoleId).toHaveBeenCalledWith(roleId);
    });

    it('should return 400 if roleId is not provided in deleteByRoleId', async () => {
        const request = mockRequest({ roleId: undefined });

        await permissionsController.deleteByRoleId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Role ID');
    });

    it('should delete permissions by roleId successfully', async () => {
        const roleId = uuidv4();
        const request = mockRequest({ roleId });

        await permissionsController.deleteByRoleId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Permission deleted with success' });
        expect(mockService.deleteByRoleId).toHaveBeenCalledWith(roleId);
    });
});
