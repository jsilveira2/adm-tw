import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaPvPEventPartyRepositories } from '../../../src/repositories/prisma/pvp-event/prisma-pvp-event-party.repositories';
import { prisma } from '../../../src/database/prisma';
import { PvPEventPartyDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockPvPEventParty: PvPEventPartyDb = {
    id: uuidv4(),
    pvpEventId: 'event1',
    name: 'Party Test',
    createdAt: new Date(),
    updatedAt: new Date(),
    obs: null
};

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../src/database/prisma', () => ({
    prisma: {
        pvPEventPartyDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.pvPEventPartyDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.pvPEventPartyDb.deleteMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaPvPEventPartyRepositories', () => {
    let repository: PrismaPvPEventPartyRepositories;

    beforeEach(() => {
        repository = new PrismaPvPEventPartyRepositories();
    });

    it('should find parties by PvP event ID', async () => {
        findManyMock.mockResolvedValue([mockPvPEventParty]);

        const result = await repository.findByPvPEventId('event1');
        expect(result).toEqual([mockPvPEventParty]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1' } });
    });

    it('should find parties by name', async () => {
        findManyMock.mockResolvedValue([mockPvPEventParty]);

        const result = await repository.findByName('Party Test');
        expect(result).toEqual([mockPvPEventParty]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { name: { contains: 'Party Test' } } });
    });

    it('should delete parties by PvP event ID', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await repository.deleteByPvPEventId('event1');
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1' } });
    });
});
