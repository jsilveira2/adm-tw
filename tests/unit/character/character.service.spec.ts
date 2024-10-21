import { describe, it, expect, vi, afterEach } from 'vitest';
import { CharacterService } from '../../../src/modules/character/character.service';
import { CharactersDb } from '@prisma/client';
import { ErrorHelper } from '../../../src/helpers/error-helper';
import { Disponibility } from '../../../src/enum/disponibility.enum';
import { v4 as uuidv4 } from 'uuid';

const mockRepository = {
    findByGuildId: vi.fn(),
    deleteByGuildId: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockCharacter: CharactersDb = {
    id: 'char1',
    guildId: 'guild1',
    nickname: 'Test Character',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    obs: 'Teste',
    ownerName: 'Teste',
    rank: 1,
    defaultDisponibility: Disponibility.AvailableForExternalPlayer,
    characterClassId: uuidv4()
};

describe('CharacterService', () => {
    const characterService = new CharacterService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find characters by guild id', async () => {
        mockRepository.findByGuildId.mockResolvedValue([mockCharacter]);

        const characters = await characterService.findByGuildId('guild1');
        expect(characters).toEqual([mockCharacter]);
        expect(mockRepository.findByGuildId).toHaveBeenCalledWith('guild1');
    });

    it('should throw an error when no characters found by guild id', async () => {
        mockRepository.findByGuildId.mockResolvedValue([]);

        await expect(characterService.findByGuildId('guild1')).rejects.toThrowError(
            new ErrorHelper('CharacterService', 'findByGuildId', 'Character not found', 404)
        );
    });

    it('should delete characters by guild id', async () => {
        mockRepository.deleteByGuildId.mockResolvedValue(undefined);

        await characterService.deleteByGuildId('guild1');
        expect(mockRepository.deleteByGuildId).toHaveBeenCalledWith('guild1');
    });
});
