import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaGuildRepositories } from '../../../src/repositories/prisma/guild/prisma-guild.repositories';
import { prisma } from '../../../src/database/prisma';
import { GuildDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockGuild: GuildDb = {
    id: uuidv4(),
    name: 'Test Guild',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
};

let findManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../src/database/prisma', () => ({
    prisma: {
        guildDb: {
            findMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.guildDb.findMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaGuildRepositories', () => {
    let guildRepository: PrismaGuildRepositories;

    beforeEach(() => {
        guildRepository = new PrismaGuildRepositories();
    });

    it('should find all guilds', async () => {
        findManyMock.mockResolvedValue([mockGuild]);

        const result = await guildRepository.findAll();
        expect(result).toEqual([mockGuild]);
        expect(findManyMock).toHaveBeenCalled();
    });
});
