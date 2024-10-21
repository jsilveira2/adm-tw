import { describe, it, expect, vi, afterEach } from 'vitest';
import { PartyMembersService } from '../../../../src/modules/pvp-event-party/party-members/party-members.service';
import { PartyMembersDb } from '@prisma/client';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { v4 as uuidv4 } from 'uuid';

const mockRepository = {
    findByPartyId: vi.fn(),
    findByCharacterId: vi.fn(),
    deleteByPartyId: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const mockPartyMember: PartyMembersDb = {
    id: 'member1',
    characterId: 'character1',
    partyLeader: true,
    pvpPartyId: uuidv4(),
    obs: 'Test OBS'
};

describe('PartyMembersService', () => {
    const service = new PartyMembersService(mockRepository);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should find party members by party id', async () => {
        mockRepository.findByPartyId.mockResolvedValue([mockPartyMember]);

        const members = await service.findByPartyId('party1');
        expect(members).toEqual([mockPartyMember]);
        expect(mockRepository.findByPartyId).toHaveBeenCalledWith('party1');
    });

    it('should throw error when no party members found by party id', async () => {
        mockRepository.findByPartyId.mockResolvedValue([]);

        await expect(service.findByPartyId('party1')).rejects.toThrowError(
            new ErrorHelper('PartyMembersService', 'findByPartyId', 'Party Members not found', 404)
        );
    });

    it('should find party members by character id', async () => {
        mockRepository.findByCharacterId.mockResolvedValue([mockPartyMember]);

        const members = await service.findByCharacterId('character1');
        expect(members).toEqual([mockPartyMember]);
        expect(mockRepository.findByCharacterId).toHaveBeenCalledWith('character1');
    });

    it('should delete party members by party id', async () => {
        mockRepository.deleteByPartyId.mockResolvedValue(undefined);

        await service.deleteByPartyId('party1');
        expect(mockRepository.deleteByPartyId).toHaveBeenCalledWith('party1');
    });
});