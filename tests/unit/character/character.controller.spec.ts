import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CharacterController } from '../../../src/modules/character/character.controller';
import { CharacterService } from '../../../src/modules/character/character.service';
import { v4 as uuidv4 } from 'uuid';
import { CharactersDb } from '@prisma/client';

const mockService = {
    findByGuildId: vi.fn(),
    deleteByGuildId: vi.fn(),
};

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

const characterMock: CharactersDb = { 
    id: uuidv4(), 
    nickname: 'Test Character', 
    characterClassId: uuidv4(),
    guildId: uuidv4(), 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date(), 
    rank: 0, 
    ownerName: 'Test', 
    defaultDisponibility: 4 ,
    obs: 'Test'
}

describe('CharacterController', () => {
    const characterController = new CharacterController(mockService as unknown as CharacterService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if guildId is not provided in getByGuildId', async () => {
        const request = mockRequest({ guildId: undefined });

        await characterController.getByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Guild ID');
    });

    it('should get characters by guildId successfully', async () => {
        const guildId = characterMock.guildId;
        const characters: CharactersDb[] = [characterMock];
        const request = mockRequest({ guildId });
        mockService.findByGuildId.mockResolvedValue(characters);

        await characterController.getByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(characters);
        expect(mockService.findByGuildId).toHaveBeenCalledWith(guildId);
    });

    it('should delete characters by guildId successfully', async () => {
        const guildId = uuidv4();
        const request = mockRequest({ guildId });

        await characterController.deleteByGuildId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Character deleted with success' });
        expect(mockService.deleteByGuildId).toHaveBeenCalledWith(guildId);
    });
});
