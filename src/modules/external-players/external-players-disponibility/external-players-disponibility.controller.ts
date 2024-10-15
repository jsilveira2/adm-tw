import { FastifyReply, FastifyRequest } from 'fastify';
import { ExternalPlayersDisponibilityService } from './external-players-disponibility.service';
import { externalPlayersDisponibilitySchema } from './schema';
import { ControllerBase } from '../../base/base.controller';

export class ExternalPlayersDisponibilityController extends ControllerBase<typeof externalPlayersDisponibilitySchema.shape> {
    constructor(public readonly service: ExternalPlayersDisponibilityService) {
        super(service, externalPlayersDisponibilitySchema);
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

    async getByPvPEventIdAndDisponibility(request: FastifyRequest, reply: FastifyReply) {
        const { pvpEventId } = request.params as { pvpEventId: string };
        const { disponibility } = request.params as { disponibility: number };
        if (!pvpEventId) {
            return reply.status(400).send('Invalid PvP Event ID');
        } else {
            const data = await this.service.findByPvPEventIdAndDisponibility(pvpEventId, disponibility);

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