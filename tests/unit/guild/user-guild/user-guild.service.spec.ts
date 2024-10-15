import { describe, it, expect, vi, afterEach } from 'vitest';
import { UserGuildService } from '../../../../src/modules/guild/user-guilds/user-guild.service';
import { UserGuildsDb } from '@prisma/client';
import { ErrorHelper } from '../../../../src/helpers/error-helper';

const mockRepository = {
    findByUserId: vi.fn(),
    findByGuildId: vi.fn(),
    deleteByUserId: vi.fn(),
    deleteByGuildId: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockGuild: UserGuildsDb = {
    id: 'userguild1',
    userId: 'user1',
    guildId: 'guild1',
    createdAt: new Date()
};

const mockGuilds: UserGuildsDb[] = [mockGuild];

describe('UserGuildService', () => {
    const userGuildService = new UserGuildService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find userguilds by user id', async () => {
        mockRepository.findByUserId.mockResolvedValue(mockGuilds);

        const result = await userGuildService.findByUserId('user1');
        expect(result).toEqual(mockGuilds);
        expect(mockRepository.findByUserId).toHaveBeenCalledWith('user1');
    });

    it('should throw an error when no userguilds found by user id', async () => {
        mockRepository.findByUserId.mockResolvedValue([]);

        await expect(userGuildService.findByUserId('user1')).rejects.toThrowError(
            new ErrorHelper('UserGuildService', 'findByUserId', 'UserGuild not found', 404)
        );
    });

    it('should find userguilds by guild id', async () => {
        mockRepository.findByGuildId.mockResolvedValue(mockGuilds);

        const result = await userGuildService.findByGuildId('guild1');
        expect(result).toEqual(mockGuilds);
        expect(mockRepository.findByGuildId).toHaveBeenCalledWith('guild1');
    });

    it('should throw an error when no userguilds found by guild id', async () => {
        mockRepository.findByGuildId.mockResolvedValue([]);

        await expect(userGuildService.findByGuildId('guild1')).rejects.toThrowError(
            new ErrorHelper('UserGuildService', 'findByGuildId', 'UserGuild not found', 404)
        );
    });

    it('should delete userguilds by user id', async () => {
        mockRepository.deleteByUserId.mockResolvedValue(undefined);

        await userGuildService.deleteByUserId('user1');
        expect(mockRepository.deleteByUserId).toHaveBeenCalledWith('user1');
    });

    it('should delete userguilds by guild id', async () => {
        mockRepository.deleteByGuildId.mockResolvedValue(undefined);

        await userGuildService.deleteByGuildId('guild1');
        expect(mockRepository.deleteByGuildId).toHaveBeenCalledWith('guild1');
    });
});
