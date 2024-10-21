import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaCharacterClasses } from '../../../src/repositories/prisma/character/prisma-character-classes.repositores';
import { prisma } from '../../../src/database/prisma';
import { CharacterClassesDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockCharacterClass: CharacterClassesDb = {
    id: uuidv4(),
    name: 'Warrior',
    shortName: 'WR',
    isActive: true,
    createdAt: new Date()
};

let findManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../src/database/prisma', () => ({
    prisma: {
        characterClassesDb: {
            findMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.characterClassesDb.findMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaCharacterClasses', () => {
    let characterClassesRepository: PrismaCharacterClasses;

    beforeEach(() => {
        characterClassesRepository = new PrismaCharacterClasses();
    });

    it('should find all character classes', async () => {
        findManyMock.mockResolvedValue([mockCharacterClass]);

        const result = await characterClassesRepository.findAll();
        expect(result).toEqual([mockCharacterClass]);
        expect(findManyMock).toHaveBeenCalled();
    });
});
