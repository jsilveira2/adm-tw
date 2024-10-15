import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaUserGuildRepositories } from '../../../../src/repositories/prisma/guild/prisma-user-guild.repositories';
import { prisma } from '../../../../src/database/prisma';
import { UserGuildsDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockUserGuild: UserGuildsDb = {
    id: uuidv4(),
    userId: uuidv4(),
    guildId: uuidv4(),
    createdAt: new Date()
};

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        userGuildsDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.userGuildsDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.userGuildsDb.deleteMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaUserGuildRepositories', () => {
    let userGuildRepository: PrismaUserGuildRepositories;

    beforeEach(() => {
        userGuildRepository = new PrismaUserGuildRepositories();
    });

    it('should find user guilds by userId', async () => {
        const userId = mockUserGuild.userId;
        findManyMock.mockResolvedValue([mockUserGuild]);

        const result = await userGuildRepository.findByUserId(userId);
        expect(result).toEqual([mockUserGuild]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { userId } });
    });

    it('should find user guilds by guildId', async () => {
        const guildId = mockUserGuild.guildId;
        findManyMock.mockResolvedValue([mockUserGuild]);

        const result = await userGuildRepository.findByGuildId(guildId);
        expect(result).toEqual([mockUserGuild]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { guildId } });
    });

    it('should delete user guilds by userId', async () => {
        const userId = mockUserGuild.userId;
        deleteManyMock.mockResolvedValue({ count: 1 });

        await userGuildRepository.deleteByUserId(userId);
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { userId } });
    });

    it('should delete user guilds by guildId', async () => {
        const guildId = mockUserGuild.guildId;
        deleteManyMock.mockResolvedValue({ count: 1 });

        await userGuildRepository.deleteByGuildId(guildId);
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { guildId } });
    });
});
