import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaExternalPlayersDisponibilityRepositories } from '../../../../src/repositories/prisma/external-players/prisma-external-players-disponibility.repositories';
import { prisma } from '../../../../src/database/prisma';
import { ExternalPlayersDisponibilityDb } from '@prisma/client';
import { Disponibility } from '../../../../src/enum/disponibility.enum';
import { v4 as uuidv4 } from 'uuid';

const mockDisponibility: ExternalPlayersDisponibilityDb = {
    id: uuidv4(),
    pvpEventId: 'event1',
    externalPlayerId: 'player1',
    disponibility: Disponibility.Yes,
    createdAt: new Date(),
    updatedAt: new Date(),
    obs: null
};

let findManyMock: ReturnType<typeof vi.fn>;
let deleteManyMock: ReturnType<typeof vi.fn>;

vi.mock('../../../../src/database/prisma', () => ({
    prisma: {
        externalPlayersDisponibilityDb: {
            findMany: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    findManyMock = prisma.externalPlayersDisponibilityDb.findMany as ReturnType<typeof vi.fn>;
    deleteManyMock = prisma.externalPlayersDisponibilityDb.deleteMany as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
});

describe('PrismaExternalPlayersDisponibilityRepositories', () => {
    let repository: PrismaExternalPlayersDisponibilityRepositories;

    beforeEach(() => {
        repository = new PrismaExternalPlayersDisponibilityRepositories();
    });

    it('should find players by PvP event ID', async () => {
        findManyMock.mockResolvedValue([mockDisponibility]);

        const result = await repository.findByPvPEventId('event1');
        expect(result).toEqual([mockDisponibility]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1' } });
    });

    it('should return an empty array if no players found by PvP event ID', async () => {
        findManyMock.mockResolvedValue([]);

        const result = await repository.findByPvPEventId('event2');
        expect(result).toEqual([]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event2' } });
    });

    it('should find players by PvP event ID and disponibility', async () => {
        findManyMock.mockResolvedValue([mockDisponibility]);

        const result = await repository.findByPvPEventIdAndDisponibility('event1', Disponibility.Yes);
        expect(result).toEqual([mockDisponibility]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1', disponibility: Disponibility.Yes } });
    });

    it('should return an empty array if no players found by PvP event ID and disponibility', async () => {
        findManyMock.mockResolvedValue([]);

        const result = await repository.findByPvPEventIdAndDisponibility('event1', Disponibility.No);
        expect(result).toEqual([]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1', disponibility: Disponibility.No } });
    });

    it('should find players by PvP event ID and disponibility Yes', async () => {
        findManyMock.mockResolvedValue([mockDisponibility]);

        const result = await repository.findByPvPEventIdAndDisponibilityYes('event1');
        expect(result).toEqual([mockDisponibility]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1', disponibility: Disponibility.Yes } });
    });

    it('should return an empty array if no players found by PvP event ID and disponibility Yes', async () => {
        findManyMock.mockResolvedValue([]);

        const result = await repository.findByPvPEventIdAndDisponibilityYes('event2');
        expect(result).toEqual([]);
        expect(findManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event2', disponibility: Disponibility.Yes } });
    });

    it('should delete players by PvP event ID', async () => {
        deleteManyMock.mockResolvedValue({ count: 1 });

        await repository.deleteByPvPEventId('event1');
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event1' } });
    });

    it('should not throw an error if no players are deleted', async () => {
        deleteManyMock.mockResolvedValue({ count: 0 });

        await expect(repository.deleteByPvPEventId('event2')).resolves.not.toThrow();
        expect(deleteManyMock).toHaveBeenCalledWith({ where: { pvpEventId: 'event2' } });
    });

    it('should throw an error when findByPvPEventId fails', async () => {
        findManyMock.mockRejectedValue(new Error('Database error'));

        await expect(repository.findByPvPEventId('event1')).rejects.toThrow('Database error');
    });

    it('should throw an error when findByPvPEventIdAndDisponibility fails', async () => {
        findManyMock.mockRejectedValue(new Error('Database error'));

        await expect(repository.findByPvPEventIdAndDisponibility('event1', Disponibility.Yes)).rejects.toThrow('Database error');
    });

    it('should throw an error when findByPvPEventIdAndDisponibilityYes fails', async () => {
        findManyMock.mockRejectedValue(new Error('Database error'));

        await expect(repository.findByPvPEventIdAndDisponibilityYes('event1')).rejects.toThrow('Database error');
    });

    it('should throw an error when deleteByPvPEventId fails', async () => {
        deleteManyMock.mockRejectedValue(new Error('Database error'));

        await expect(repository.deleteByPvPEventId('event1')).rejects.toThrow('Database error');
    });
});
