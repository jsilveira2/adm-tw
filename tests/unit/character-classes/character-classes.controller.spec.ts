import { describe, it, expect, vi, afterEach } from 'vitest';
import { CharacterClassesController } from '../../../src/modules/character-classes/character-classes.controller';
import { CharacterClassesService } from '../../../src/modules/character-classes/character-classes.service';
import { v4 as uuidv4 } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

const mockService = {
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

describe('CharacterClassesController', () => {
    const characterClassesController = new CharacterClassesController(mockService as unknown as CharacterClassesService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should get character class by id successfully', async () => {
        const id = uuidv4();
        const request = mockRequest({ id });
        const characterClass = { id: id, name: 'Mage', createdAt: new Date(), updatedAt: new Date() };
        mockService.findById.mockResolvedValue(characterClass);

        await characterClassesController.getById(request, mockReply as unknown as FastifyReply);

        expect(mockService.findById).toHaveBeenCalledWith(id);
    });
});
