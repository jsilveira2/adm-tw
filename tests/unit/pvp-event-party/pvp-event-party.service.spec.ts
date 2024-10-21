import { describe, it, expect, vi, afterEach } from 'vitest';
import { PvPEventPartyService } from '../../../src/modules/pvp-event-party/pvp-event-party.service';
import { PvPEventPartyDb } from '@prisma/client';
import { ErrorHelper } from '../../../src/helpers/error-helper';

const mockRepository = {
    findByPvPEventId: vi.fn(),
    findByName: vi.fn(),
    deleteByPvPEventId: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockPvPEventParty: PvPEventPartyDb = {
    id: 'party1',
    pvpEventId: 'event1',
    name: 'Party 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    obs: 'Test OBS'
};

describe('PvPEventPartyService', () => {
    const service = new PvPEventPartyService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find party by PvP event id', async () => {
        mockRepository.findByPvPEventId.mockResolvedValue([mockPvPEventParty]);

        const parties = await service.findByPvPEventId('event1');
        expect(parties).toEqual([mockPvPEventParty]);
        expect(mockRepository.findByPvPEventId).toHaveBeenCalledWith('event1');
    });

    it('should throw error when no party found by PvP event id', async () => {
        mockRepository.findByPvPEventId.mockResolvedValue([]);

        await expect(service.findByPvPEventId('event1')).rejects.toThrowError(
            new ErrorHelper('PvPEventPartyService', 'findByPvPEventId', 'PvP Event Party not found', 404)
        );
    });

    it('should find party by name', async () => {
        mockRepository.findByName.mockResolvedValue([mockPvPEventParty]);

        const parties = await service.findByName('Party 1');
        expect(parties).toEqual([mockPvPEventParty]);
        expect(mockRepository.findByName).toHaveBeenCalledWith('Party 1');
    });

    it('should delete party by PvP event id', async () => {
        mockRepository.deleteByPvPEventId.mockResolvedValue(undefined);

        await service.deleteByPvPEventId('event1');
        expect(mockRepository.deleteByPvPEventId).toHaveBeenCalledWith('event1');
    });
});
