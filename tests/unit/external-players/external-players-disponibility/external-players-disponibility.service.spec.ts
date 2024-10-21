import { describe, it, expect, vi, afterEach } from 'vitest';
import { ExternalPlayersDisponibilityService } from '../../../../src/modules/external-players/external-players-disponibility/external-players-disponibility.service';
import { ExternalPlayersDisponibilityDb } from '@prisma/client';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { v4 as uuidv4 } from 'uuid';

const mockRepository = {
    findByPvPEventId: vi.fn(),
    findByPvPEventIdAndDisponibility: vi.fn(),
    findByPvPEventIdAndDisponibilityYes: vi.fn(),
    deleteByPvPEventId: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockDisponibility: ExternalPlayersDisponibilityDb = {
    id: 'disp1',
    pvpEventId: 'event1',
    disponibility: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    externalPlayerId: uuidv4(),
    obs: 'Test OBS'
};

describe('ExternalPlayersDisponibilityService', () => {
    const service = new ExternalPlayersDisponibilityService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find disponibility by PvP event id', async () => {
        mockRepository.findByPvPEventId.mockResolvedValue([mockDisponibility]);

        const disponibility = await service.findByPvPEventId('event1');
        expect(disponibility).toEqual([mockDisponibility]);
        expect(mockRepository.findByPvPEventId).toHaveBeenCalledWith('event1');
    });

    it('should throw error when no disponibility found by PvP event id', async () => {
        mockRepository.findByPvPEventId.mockResolvedValue([]);

        await expect(service.findByPvPEventId('event1')).rejects.toThrowError(
            new ErrorHelper('ExternalPlayersDisponibilityService', 'findByPvPEventId', 'External Player Disponibility not found', 404)
        );
    });

    it('should find disponibility by event id and disponibility value', async () => {
        mockRepository.findByPvPEventIdAndDisponibility.mockResolvedValue([mockDisponibility]);

        const disponibility = await service.findByPvPEventIdAndDisponibility('event1', 1);
        expect(disponibility).toEqual([mockDisponibility]);
        expect(mockRepository.findByPvPEventIdAndDisponibility).toHaveBeenCalledWith('event1', 1);
    });

    it('should delete disponibility by PvP event id', async () => {
        mockRepository.deleteByPvPEventId.mockResolvedValue(undefined);

        await service.deleteByPvPEventId('event1');
        expect(mockRepository.deleteByPvPEventId).toHaveBeenCalledWith('event1');
    });
});
