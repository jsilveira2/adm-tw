import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaExternalPlayersRepositories } from '../../../src/repositories/prisma/external-players/prisma-external-players.repositories';
import { prisma } from '../../../src/database/prisma';
import { ExternalPlayersDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockExternalPlayer: ExternalPlayersDb = {
    id: uuidv4(),
    name: 'Test',
    guildId: 'guild1',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    obs: 'Test Obs'
};

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../src/database/prisma', () => ({
    prisma: {
        externalPlayersDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.externalPlayersDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.externalPlayersDb.deleteMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaExternalPlayersRepositories', () => {
    let externalPlayersRepository: PrismaExternalPlayersRepositories;

    beforeEach(() => {
        externalPlayersRepository = new PrismaExternalPlayersRepositories();
    });

    it('should find external players by guildId', async () => {
        findManyMock.mockResolvedValue([mockExternalPlayer]);

        const result = await externalPlayersRepository.findByGuildId('guild1');
        expect(result).toEqual([mockExternalPlayer]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { guildId: 'guild1' } });
    });

    it('should delete external players by guildId', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await externalPlayersRepository.deleteByGuildId('guild1');
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { guildId: 'guild1' } });
    });
});
