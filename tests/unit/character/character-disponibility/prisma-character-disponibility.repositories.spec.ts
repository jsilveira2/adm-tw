import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaCharacterDisponibilityRepositories } from '../../../../src/repositories/prisma/character/prisma-character-disponibility.repositories';
import { prisma } from '../../../../src/database/prisma';
import { CharacterEventDisponibilityDb } from '@prisma/client';
import { Disponibility } from '../../../../src/enum/disponibility.enum';
import { v4 as uuidv4 } from 'uuid';

const mockDisponibility: CharacterEventDisponibilityDb = {
    id: uuidv4(),
    pvpEventId: 'event1',
    characterId: 'char1',
    disponibility: Disponibility.Yes,
    createdAt: new Date(),
    updatedAt: new Date(),
    obs: 'Test',
    externalPlayerId: null
};

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        characterEventDisponibilityDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.characterEventDisponibilityDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.characterEventDisponibilityDb.deleteMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaCharacterDisponibilityRepositories', () => {
    let disponibilityRepository: PrismaCharacterDisponibilityRepositories;

    beforeEach(() => {
        disponibilityRepository = new PrismaCharacterDisponibilityRepositories();
    });

    it('should find disponibilities by PvPEventId', async () => {
        findManyMock.mockResolvedValue([mockDisponibility]);

        const result = await disponibilityRepository.findByPvPEventId('event1');
        expect(result).toEqual([mockDisponibility]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1' } });
    });

    it('should find disponibilities by PvPEventId with disponibility Yes', async () => {
        findManyMock.mockResolvedValue([mockDisponibility]);

        const result = await disponibilityRepository.findByPvPEventIdAndDisponibilityYes('event1');
        expect(result).toEqual([mockDisponibility]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1', disponibility: Disponibility.Yes } });
    });

    it('should delete disponibilities by PvPEventId', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await disponibilityRepository.deleteByPvPEventId('event1');
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1' } });
    });
});
