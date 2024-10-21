import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaPvPEventRepositories } from '../../../src/repositories/prisma/pvp-event/prisma-pvp-event.repositories';
import { prisma } from '../../../src/database/prisma';
import { PvPEventDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockPvPEvent: PvPEventDb = {
    id: uuidv4(),
    guildId: 'guild1',
    name: 'Test Event',
    createdAt: new Date(),
    updatedAt: new Date(),
    ended: false,
    type: 2,
    date: new Date()
};

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../src/database/prisma', () => ({
    prisma: {
        pvPEventDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.pvPEventDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.pvPEventDb.deleteMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaPvPEventRepositories', () => {
    let repository: PrismaPvPEventRepositories;

    beforeEach(() => {
        repository = new PrismaPvPEventRepositories();
    });

    it('should find events by guild ID', async () => {
        findManyMock.mockResolvedValue([mockPvPEvent]);

        const result = await repository.findByGuildId('guild1');
        expect(result).toEqual([mockPvPEvent]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { guildId: 'guild1' } });
    });

    it('should find events by guild ID and not ended', async () => {
        findManyMock.mockResolvedValue([mockPvPEvent]);

        const result = await repository.findByGuildAndNotEndedId('guild1');
        expect(result).toEqual([mockPvPEvent]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { guildId: 'guild1', ended: false } });
    });

    it('should delete events by guild ID', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await repository.deleteByGuildId('guild1');
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { guildId: 'guild1' } });
    });
});
