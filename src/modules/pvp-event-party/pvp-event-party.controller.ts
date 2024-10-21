import { FastifyReply, FastifyRequest } from 'fastify';
import { PvPEventPartyService } from './pvp-event-party.service';
import { pvpEventPartySchema } from './schema';
import { ControllerBase } from '../base/base.controller';

export class PvPEventPartyController extends ControllerBase<typeof pvpEventPartySchema.shape> {
    constructor(public readonly service: PvPEventPartyService) {
        super(service, pvpEventPartySchema);
    }

    async getByPvPEventId(request: FastifyRequest, reply: FastifyReply) {
        const { pvpEventId } = request.params as { pvpEventId: string };
        if (!pvpEventId) {
            return reply.status(400).send('Invalid PvP Event ID');
        } else {
            const data = await this.service.findByPvPEventId(pvpEventId);

            return reply.status(200).send(data);
        }
    }
    
    async getByName(request: FastifyRequest, reply: FastifyReply) {
        const { name } = request.params as { name: string };
        if (!name) {
            return reply.status(400).send('Invalid Name');
        } else {
            const data = await this.service.findByName(name);

            return reply.status(200).send(data);
        }
    }

    async deleteByPvPEventId(request: FastifyRequest, reply: FastifyReply) {
        const { pvpEventId } = request.params as { pvpEventId: string };
        if (!pvpEventId) {
            return reply.status(400).send('Invalid PvP Event ID');
        }

        await this.service.deleteByPvPEventId(pvpEventId);

        return reply.status(200).send({ message: 'PvP Event Disponibility deleted with success' });
    }
}