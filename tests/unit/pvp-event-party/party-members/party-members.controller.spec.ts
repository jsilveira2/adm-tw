import { describe, it, expect, vi, afterEach } from 'vitest';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PartyMembersController } from '../../../../src/modules/pvp-event-party/party-members/party-members.controller';
import { PartyMembersService } from '../../../../src/modules/pvp-event-party/party-members/party-members.service';
import { v4 as uuidv4 } from 'uuid';

const mockService = {
    findByPartyId: vi.fn(),
    findByCharacterId: vi.fn(),
    deleteByPartyId: vi.fn(),
};

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
}) as unknown as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

describe('PartyMembersController', () => {
    const partyMembersController = new PartyMembersController(mockService as unknown as PartyMembersService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return 400 if partyId is not provided in getByPartyId', async () => {
        const request = mockRequest({ partyId: undefined });

        await partyMembersController.getByPartyId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Party ID');
    });

    it('should get party members by partyId successfully', async () => {
        const partyId = uuidv4();
        const members = [{ id: uuidv4(), name: 'Member1', partyId, createdAt: new Date(), updatedAt: new Date() }];
        const request = mockRequest({ partyId });
        mockService.findByPartyId.mockResolvedValue(members);

        await partyMembersController.getByPartyId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(members);
        expect(mockService.findByPartyId).toHaveBeenCalledWith(partyId);
    });

    it('should return 400 if characterId is not provided in getByCharacterId', async () => {
        const request = mockRequest({ characterId: undefined });

        await partyMembersController.getByCharacterId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Character ID');
    });

    it('should get party members by characterId successfully', async () => {
        const characterId = uuidv4();
        const members = [{ id: uuidv4(), name: 'Member1', characterId, createdAt: new Date(), updatedAt: new Date() }];
        const request = mockRequest({ characterId });
        mockService.findByCharacterId.mockResolvedValue(members);

        await partyMembersController.getByCharacterId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(members);
        expect(mockService.findByCharacterId).toHaveBeenCalledWith(characterId);
    });

    it('should return 400 if partyId is not provided in deleteByPartyId', async () => {
        const request = mockRequest({ partyId: undefined });

        await partyMembersController.deleteByPartyId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith('Invalid Party ID');
    });

    it('should delete party members by partyId successfully', async () => {
        const partyId = uuidv4();
        const request = mockRequest({ partyId });

        await partyMembersController.deleteByPartyId(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Party Members deleted with success' });
        expect(mockService.deleteByPartyId).toHaveBeenCalledWith(partyId);
    });
});
