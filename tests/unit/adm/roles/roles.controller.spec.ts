import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { RolesController } from '../../../../src/modules/adm/roles/roles.controller';
import { RolesService } from '../../../../src/modules/adm/roles/roles.service';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../../../src/modules/adm/roles/schema';

const mockService = {
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

describe('RolesController', () => {
    const rolesController = new RolesController(mockService as unknown as RolesService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if id is not provided in getById', async () => {
        const request = mockRequest({ id: undefined });

        await rolesController.getById(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid ID');
    });

    it('should get role by id successfully', async () => {
        const roleId = uuidv4();
        const role = { id: roleId, name: 'Admin' };
        const request = mockRequest({ id: roleId });
        mockService.findById.mockResolvedValue(role);

        await rolesController.getById(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(role);
        expect(mockService.findById).toHaveBeenCalledWith(roleId);
    });

    it('should create a role successfully', async () => {
        const newRole = { name: 'User' };
        const createdRole = { id: uuidv4(), ...newRole };
        const request = mockRequest({}, newRole);
        mockService.create.mockResolvedValue(createdRole);

        await rolesController.create(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(201);
        expect(mockReply.send).toHaveBeenCalledWith(createdRole);
        expect(mockService.create).toHaveBeenCalledWith(newRole);
    });

    it('should update a role successfully', async () => {
        const roleId = uuidv4();
        const updatedRole: Role = { id: roleId, name: 'Updated Role' };
        const request = mockRequest({ id: roleId }, updatedRole);
        mockService.update.mockResolvedValue(updatedRole);

        await rolesController.update(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(updatedRole);
        expect(mockService.update).toHaveBeenCalledWith(roleId, updatedRole);
    });

    it('should delete a role successfully', async () => {
        const roleId = uuidv4();
        const request = mockRequest({ id: roleId });

        await rolesController.delete(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Deleted with success' });
        expect(mockService.delete).toHaveBeenCalledWith(roleId);
    });
});
