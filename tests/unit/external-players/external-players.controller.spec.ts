import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ExternalPlayersController } from '../../../src/modules/external-players/external-players.controller';
import { ExternalPlayersService } from '../../../src/modules/external-players/external-players.service';
import { v4 as uuidv4 } from 'uuid';

const mockService = {
    findByGuildId: vi.fn(),
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

describe('ExternalPlayersController', () => {
    const externalPlayersController = new ExternalPlayersController(mockService as unknown as ExternalPlayersService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if guildId is not provided in getByGuildId', async () => {
        const request = mockRequest({ guildId: undefined });

        await externalPlayersController.getByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Guild ID');
    });

    it('should get external players by guildId successfully', async () => {
        const guildId = uuidv4();
        const players = [{ id: uuidv4(), name: 'Player1', guildId, createdAt: new Date(), updatedAt: new Date() }];
        const request = mockRequest({ guildId });
        mockService.findByGuildId.mockResolvedValue(players);

        await externalPlayersController.getByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(players);
        expect(mockService.findByGuildId).toHaveBeenCalledWith(guildId);
    });

    it('should delete external players by guildId successfully', async () => {
        const guildId = uuidv4();
        const request = mockRequest({ guildId });

        await externalPlayersController.deleteByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'External Player deleted with success' });
        expect(mockService.deleteByGuildId).toHaveBeenCalledWith(guildId);
    });
});
