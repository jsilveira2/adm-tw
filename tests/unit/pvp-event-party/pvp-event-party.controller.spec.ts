import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PvPEventPartyController } from '../../../src/modules/pvp-event-party/pvp-event-party.controller';
import { PvPEventPartyService } from '../../../src/modules/pvp-event-party/pvp-event-party.service';
import { v4 as uuidv4 } from 'uuid';

const mockService = {
    findByPvPEventId: vi.fn(),
    findByName: vi.fn(),
    deleteByPvPEventId: vi.fn(),
};

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

describe('PvPEventPartyController', () => {
    const controller = new PvPEventPartyController(mockService as unknown as PvPEventPartyService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if pvpEventId is not provided in getByPvPEventId', async () => {
        const request = mockRequest({ pvpEventId: undefined });

        await controller.getByPvPEventId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid PvP Event ID');
    });

    it('should get pvp event party by pvpEventId successfully', async () => {
        const pvpEventId = uuidv4();
        const data = [{ id: uuidv4(), pvpEventId }];
        const request = mockRequest({ pvpEventId });
        mockService.findByPvPEventId.mockResolvedValue(data);

        await controller.getByPvPEventId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(data);
        expect(mockService.findByPvPEventId).toHaveBeenCalledWith(pvpEventId);
    });

    it('should delete pvp event party by pvpEventId successfully', async () => {
        const pvpEventId = uuidv4();
        const request = mockRequest({ pvpEventId });

        await controller.deleteByPvPEventId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'PvP Event Disponibility deleted with success' });
        expect(mockService.deleteByPvPEventId).toHaveBeenCalledWith(pvpEventId);
    });
});
