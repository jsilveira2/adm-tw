import { describe, it, expect, vi, afterEach } from 'vitest';
import { PvPEventService } from '../../../src/modules/pvp-event/pvp-event.service';
import { PvPEventDb } from '@prisma/client';
import { ErrorHelper } from '../../../src/helpers/error-helper';

const mockRepository = {
    findByGuildId: vi.fn(),
    findByGuildAndNotEndedId: vi.fn(),
    deleteByGuildId: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockPvPEvent: PvPEventDb = {
    id: 'event1',
    date: new Date(),
    type: 0,
    guildId: 'guild1',
    name: 'PvP Event',
    ended: false,
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('PvPEventService', () => {
    const service = new PvPEventService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find PvP events by guild id', async () => {
        mockRepository.findByGuildId.mockResolvedValue([mockPvPEvent]);

        const events = await service.findByGuildId('guild1');
        expect(events).toEqual([mockPvPEvent]);
        expect(mockRepository.findByGuildId).toHaveBeenCalledWith('guild1');
    });

    it('should throw error when no PvP events found by guild id', async () => {
        mockRepository.findByGuildId.mockResolvedValue([]);

        await expect(service.findByGuildId('guild1')).rejects.toThrowError(
            new ErrorHelper('PvPEventService', 'findByGuildId', 'PvPEvent not found', 404)
        );
    });

    it('should find not ended PvP events by guild id', async () => {
        mockRepository.findByGuildAndNotEndedId.mockResolvedValue([mockPvPEvent]);

        const events = await service.findByGuildAndNotEndedId('guild1');
        expect(events).toEqual([mockPvPEvent]);
        expect(mockRepository.findByGuildAndNotEndedId).toHaveBeenCalledWith('guild1');
    });

    it('should delete PvP events by guild id', async () => {
        mockRepository.deleteByGuildId.mockResolvedValue(undefined);

        await service.deleteByGuildId('guild1');
        expect(mockRepository.deleteByGuildId).toHaveBeenCalledWith('guild1');
    });
});
