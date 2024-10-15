import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserGuildController } from '../../../../src/modules/guild/user-guilds/user-guild.controller';
import { UserGuildService } from '../../../../src/modules/guild/user-guilds/user-guild.service';
import { UserGuildsDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockService = {
    findByUserId: vi.fn(),
    findByGuildId: vi.fn(),
    deleteByUserId: vi.fn(),
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

describe('UserGuildController', () => {
    const userGuildController = new UserGuildController(mockService as unknown as UserGuildService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if userId is not provided in getByUserId', async () => {
        const request = mockRequest({ userId: undefined });

        await userGuildController.getByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid User ID');
    });

    it('should get user guilds by userId successfully', async () => {
        const userId = uuidv4();
        const userGuilds: UserGuildsDb[] = [{ id: 'userguild1', userId: userId, guildId: 'guild1', createdAt: new Date() }];
        const request = mockRequest({ userId });
        mockService.findByUserId.mockResolvedValue(userGuilds);

        await userGuildController.getByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(userGuilds);
        expect(mockService.findByUserId).toHaveBeenCalledWith(userId);
    });

    it('should return 400 if guildId is not provided in getByGuildId', async () => {
        const request = mockRequest({ guildId: undefined });

        await userGuildController.getByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Guild ID');
    });

    it('should get user guilds by guildId successfully', async () => {
        const guildId = uuidv4();
        const userGuilds: UserGuildsDb[] = [{ id: 'userguild1', userId: 'user1', guildId: guildId, createdAt: new Date() }];
        const request = mockRequest({ guildId });
        mockService.findByGuildId.mockResolvedValue(userGuilds);

        await userGuildController.getByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(userGuilds);
        expect(mockService.findByGuildId).toHaveBeenCalledWith(guildId);
    });

    it('should delete user guild by userId successfully', async () => {
        const userId = uuidv4();
        const request = mockRequest({ userId });

        await userGuildController.deleteByUserId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'UserGuild deleted with success' });
        expect(mockService.deleteByUserId).toHaveBeenCalledWith(userId);
    });

    it('should delete user guild by guildId successfully', async () => {
        const guildId = uuidv4();
        const request = mockRequest({ guildId });

        await userGuildController.deleteByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'UserGuild deleted with success' });
        expect(mockService.deleteByGuildId).toHaveBeenCalledWith(guildId);
    });
});
