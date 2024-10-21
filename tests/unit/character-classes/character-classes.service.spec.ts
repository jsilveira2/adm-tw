import { describe, it, expect, vi, afterEach } from 'vitest';
import { CharacterClassesService } from '../../../src/modules/character-classes/character-classes.service';
import { CharacterClassesDb } from '@prisma/client';

const mockRepository = {
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockCharacterClass: CharacterClassesDb = {
    id: 'class1',
    name: 'Warrior',
    shortName: 'WR',
    isActive: true,
    createdAt: new Date()
};

describe('CharacterClassesService', () => {
    const classesService = new CharacterClassesService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find a character class by id', async () => {
        mockRepository.findById.mockResolvedValue(mockCharacterClass);

        const characterClass = await classesService.findById('class1');
        expect(characterClass).toEqual(mockCharacterClass);
        expect(mockRepository.findById).toHaveBeenCalledWith('class1');
    });
});
