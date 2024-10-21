import { FastifyReply, FastifyRequest } from 'fastify';
import { PartyMembersService } from './party-members.service';
import { partyMembersSchema } from './schema';
import { ControllerBase } from '../../base/base.controller';

export class PartyMembersController extends ControllerBase<typeof partyMembersSchema.shape> {
    constructor(public readonly service: PartyMembersService) {
        super(service, partyMembersSchema);
    }

    async getByPartyId(request: FastifyRequest, reply: FastifyReply) {
        const { partyId } = request.params as { partyId: string };
        if (!partyId) {
            return reply.status(400).send('Invalid Party ID');
        } else {
            const data = await this.service.findByPartyId(partyId);

            return reply.status(200).send(data);
        }
    }
    
    async getByCharacterId(request: FastifyRequest, reply: FastifyReply) {
        const { characterId } = request.params as { characterId: string };
        if (!characterId) {
            return reply.status(400).send('Invalid Character ID');
        } else {
            const data = await this.service.findByCharacterId(characterId);

            return reply.status(200).send(data);
        }
    }

    async deleteByPartyId(request: FastifyRequest, reply: FastifyReply) {
        const { partyId } = request.params as { partyId: string };
        if (!partyId) {
            return reply.status(400).send('Invalid Party ID');
        }

        await this.service.deleteByPartyId(partyId);

        return reply.status(200).send({ message: 'Party Members deleted with success' });
    }
}