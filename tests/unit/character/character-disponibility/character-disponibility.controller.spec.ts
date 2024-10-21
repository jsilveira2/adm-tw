import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CharacterDisponibilityController } from '../../../../src/modules/character/character-disponibility/character-disponibility.controller';
import { CharacterDisponibilityService } from '../../../../src/modules/character/character-disponibility/character-disponibility.service';
import { v4 as uuidv4 } from 'uuid';

const mockService = {
    findByPvPEventId: vi.fn(),
    findByPvPEventIdAndDisponibilityYes: vi.fn(),
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

describe('CharacterDisponibilityController', () => {
    const characterDisponibilityController = new CharacterDisponibilityController(mockService as unknown as CharacterDisponibilityService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if pvpEventId is not provided in getByPvPEventId', async () => {
        const request = mockRequest({ pvpEventId: undefined });

        await characterDisponibilityController.getByPvPEventId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid PvP Event ID');
    });

    it('should get disponibility by pvpEventId successfully', async () => {
        const pvpEventId = uuidv4();
        const disponibility = [{ id: uuidv4(), pvpEventId, disponibility: 'yes', createdAt: new Date(), updatedAt: new Date() }];
        const request = mockRequest({ pvpEventId });
        mockService.findByPvPEventId.mockResolvedValue(disponibility);

        await characterDisponibilityController.getByPvPEventId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(disponibility);
        expect(mockService.findByPvPEventId).toHaveBeenCalledWith(pvpEventId);
    });

    it('should delete disponibility by pvpEventId successfully', async () => {
        const pvpEventId = uuidv4();
        const request = mockRequest({ pvpEventId });

        await characterDisponibilityController.deleteByPvPEventId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Character Disponibility deleted with success' });
        expect(mockService.deleteByPvPEventId).toHaveBeenCalledWith(pvpEventId);
    });
});
