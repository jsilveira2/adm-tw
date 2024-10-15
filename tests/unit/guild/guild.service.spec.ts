import { describe, it, expect, vi, afterEach } from 'vitest';
import { GuildService } from '../../../src/modules/guild/guild.service';
import { GuildDb } from '@prisma/client';
import { ErrorHelper } from '../../../src/helpers/error-helper';

const mockRepository = {
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockGuild: GuildDb = {
    id: 'guild1',
    name: 'Test Guild',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
};

describe('GuildService', () => {
    const guildService = new GuildService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find a guild by id', async () => {
        mockRepository.findById.mockResolvedValue(mockGuild);

        const guild = await guildService.findById('guild1');
        expect(guild).toEqual(mockGuild);
        expect(mockRepository.findById).toHaveBeenCalledWith('guild1');
    });

    it('should throw an error when no guild found by id', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(guildService.findById('guild1')).rejects.toThrowError(
            new ErrorHelper('GuildService', 'findById', 'Object not found', 404)
        );
    });

    it('should delete a guild by id', async () => {
        mockRepository.findById.mockResolvedValue(mockGuild);
        mockRepository.delete.mockResolvedValue(undefined);

        await guildService.delete('guild1');
        expect(mockRepository.delete).toHaveBeenCalledWith('guild1');
    });
});
