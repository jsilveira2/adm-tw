import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PvPEventController } from '../../../src/modules/pvp-event/pvp-event.controller';
import { PvPEventService } from '../../../src/modules/pvp-event/pvp-event.service';
import { v4 as uuidv4 } from 'uuid';

const mockService = {
    findByGuildId: vi.fn(),
    findByGuildAndNotEndedId: vi.fn(),
    deleteByGuildId: vi.fn(),
};

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

describe('PvPEventController', () => {
    const controller = new PvPEventController(mockService as unknown as PvPEventService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if guildId is not provided in getByGuildId', async () => {
        const request = mockRequest({ guildId: undefined });

        await controller.getByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Guild ID');
    });

    it('should get pvp events by guildId successfully', async () => {
        const guildId = uuidv4();
        const data = [{ id: uuidv4(), guildId }];
        const request = mockRequest({ guildId });
        mockService.findByGuildId.mockResolvedValue(data);

        await controller.getByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(data);
        expect(mockService.findByGuildId).toHaveBeenCalledWith(guildId);
    });

    it('should delete pvp events by guildId successfully', async () => {
        const guildId = uuidv4();
        const request = mockRequest({ guildId });

        await controller.deleteByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'PvPEvent deleted with success' });
        expect(mockService.deleteByGuildId).toHaveBeenCalledWith(guildId);
    });
});
