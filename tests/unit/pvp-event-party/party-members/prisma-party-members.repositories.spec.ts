import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaPartyMembersRepositories } from '../../../../src/repositories/prisma/pvp-event/prisma-pvp-event-party-members.repositories';
import { prisma } from '../../../../src/database/prisma';
import { PartyMembersDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockPartyMember: PartyMembersDb = {
    id: uuidv4(),
    pvpPartyId: 'party1',
    characterId: 'character1',
    partyLeader: true,
    obs: null
};

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        partyMembersDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.partyMembersDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.partyMembersDb.deleteMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaPartyMembersRepositories', () => {
    let repository: PrismaPartyMembersRepositories;

    beforeEach(() => {
        repository = new PrismaPartyMembersRepositories();
    });

    it('should find party members by party ID', async () => {
        findManyMock.mockResolvedValue([mockPartyMember]);

        const result = await repository.findByPartyId('party1');
        expect(result).toEqual([mockPartyMember]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpPartyId: 'party1' } });
    });

    it('should delete party members by party ID', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await repository.deleteByPartyId('party1');
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { pvpPartyId: 'party1' } });
    });
});
