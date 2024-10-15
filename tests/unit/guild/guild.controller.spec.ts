import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { GuildController } from '../../../src/modules/guild/guild.controller';
import { GuildService } from '../../../src/modules/guild/guild.service';
import { GuildDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockService = {
    findById: vi.fn(),
    delete: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
};

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

describe('GuildController', () => {
    const guildController = new GuildController(mockService as unknown as GuildService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if guildId is not provided in getById', async () => {
        const request = mockRequest({ id: undefined });

        await guildController.getById(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid ID');
    });

    it('should get guild by id successfully', async () => {
        const guildId = uuidv4();
        const guild: GuildDb = { id: guildId, name: 'Test Guild', createdAt: new Date(), updatedAt: new Date(), isActive: true };
        const request = mockRequest({ id: guildId });
        mockService.findById.mockResolvedValue(guild);

        await guildController.getById(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(guild);
        expect(mockService.findById).toHaveBeenCalledWith(guildId);
    });

    it('should delete guild by id successfully', async () => {
        const guildId = uuidv4();
        const request = mockRequest({ id: guildId });

        await guildController.delete(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Deleted with success' });
        expect(mockService.delete).toHaveBeenCalledWith(guildId);
    });
});
