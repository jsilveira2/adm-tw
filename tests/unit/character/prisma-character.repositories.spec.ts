import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaCharacterRepositories } from '../../../src/repositories/prisma/character/prisma-character.repositories';
import { prisma } from '../../../src/database/prisma';
import { CharactersDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { Disponibility } from '../../../src/enum/disponibility.enum';

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

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../src/database/prisma', () => ({
    prisma: {
        charactersDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.charactersDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.charactersDb.deleteMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaCharacterRepositories', () => {
    let characterRepository: PrismaCharacterRepositories;

    beforeEach(() => {
        characterRepository = new PrismaCharacterRepositories();
    });

    it('should find characters by guildId', async () => {
        findManyMock.mockResolvedValue([mockCharacter]);

        const result = await characterRepository.findByGuildId('guild1');
        expect(result).toEqual([mockCharacter]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { guildId: 'guild1' } });
    });

    it('should delete characters by guildId', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await characterRepository.deleteByGuildId('guild1');
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { guildId: 'guild1' } });
    });
});
