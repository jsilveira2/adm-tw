import { describe, it, expect, vi, afterEach } from 'vitest';
import { CharacterDisponibilityService } from '../../../../src/modules/character/character-disponibility/character-disponibility.service';
import { CharacterEventDisponibilityDb } from '@prisma/client';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { Disponibility } from '../../../../src/enum/disponibility.enum';
import { v4 as uuidv4 } from 'uuid';

const mockRepository = {
    findByPvPEventId: vi.fn(),
    findByPvPEventIdAndDisponibilityYes: vi.fn(),
    deleteByPvPEventId: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockDisponibility: CharacterEventDisponibilityDb = {
    id: 'disp1',
    pvpEventId: uuidv4(),
    characterId: uuidv4(),
    externalPlayerId: null,
    disponibility: Disponibility.Yes,
    createdAt: new Date(),
    updatedAt: new Date(),
    obs: 'Test'
};

describe('CharacterDisponibilityService', () => {
    const disponibilityService = new CharacterDisponibilityService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find disponibilities by PvP event id', async () => {
        mockRepository.findByPvPEventId.mockResolvedValue([mockDisponibility]);

        const disponibilities = await disponibilityService.findByPvPEventId('event1');
        expect(disponibilities).toEqual([mockDisponibility]);
        expect(mockRepository.findByPvPEventId).toHaveBeenCalledWith('event1');
    });

    it('should throw an error when no disponibilities found by PvP event id', async () => {
        mockRepository.findByPvPEventId.mockResolvedValue([]);

        await expect(disponibilityService.findByPvPEventId('event1')).rejects.toThrowError(
            new ErrorHelper('CharacterDisponibilityService', 'findByPvPEventId', 'Character Disponibility not found', 404)
        );
    });

    it('should delete disponibilities by PvP event id', async () => {
        mockRepository.deleteByPvPEventId.mockResolvedValue(undefined);

        await disponibilityService.deleteByPvPEventId('event1');
        expect(mockRepository.deleteByPvPEventId).toHaveBeenCalledWith('event1');
    });
});
