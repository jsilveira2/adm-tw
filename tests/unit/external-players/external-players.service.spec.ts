import { describe, it, expect, vi, afterEach } from 'vitest';
import { ExternalPlayersService } from '../../../src/modules/external-players/external-players.service';
import { ExternalPlayersDb } from '@prisma/client';
import { ErrorHelper } from '../../../src/helpers/error-helper';

const mockRepository = {
    findByGuildId: vi.fn(),
    deleteByGuildId: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockExternalPlayer: ExternalPlayersDb = {
    id: 'ext1',
    guildId: 'guild1',
    name: 'External Player',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    obs: 'Teste'
};

describe('ExternalPlayersService', () => {
    const externalPlayersService = new ExternalPlayersService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find external players by guild id', async () => {
        mockRepository.findByGuildId.mockResolvedValue([mockExternalPlayer]);

        const externalPlayers = await externalPlayersService.findByGuildId('guild1');
        expect(externalPlayers).toEqual([mockExternalPlayer]);
        expect(mockRepository.findByGuildId).toHaveBeenCalledWith('guild1');
    });

    it('should throw an error when no external players found by guild id', async () => {
        mockRepository.findByGuildId.mockResolvedValue([]);

        await expect(externalPlayersService.findByGuildId('guild1')).rejects.toThrowError(
            new ErrorHelper('ExternalPlayersService', 'findByGuildId', 'External Player not found', 404)
        );
    });

    it('should delete external players by guild id', async () => {
        mockRepository.deleteByGuildId.mockResolvedValue(undefined);

        await externalPlayersService.deleteByGuildId('guild1');
        expect(mockRepository.deleteByGuildId).toHaveBeenCalledWith('guild1');
    });
});
