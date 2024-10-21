import { FastifyReply, FastifyRequest } from 'fastify';
import { CharacterDisponibilityService } from './character-disponibility.service';
import { characterDisponibilitySchema } from './schema';
import { ControllerBase } from '../../base/base.controller';

export class CharacterDisponibilityController extends ControllerBase<typeof characterDisponibilitySchema.shape> {
    constructor(public readonly service: CharacterDisponibilityService) {
        super(service, characterDisponibilitySchema);
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

    async getByPvPEventIdAndDisponibilityYes(request: FastifyRequest, reply: FastifyReply) {
        const { pvpEventId } = request.params as { pvpEventId: string };
        if (!pvpEventId) {
            return reply.status(400).send('Invalid PvP Event ID');
        } else {
            const data = await this.service.findByPvPEventIdAndDisponibilityYes(pvpEventId);

            return reply.status(200).send(data);
        }
    }

    async deleteByPvPEventId(request: FastifyRequest, reply: FastifyReply) {
        const { pvpEventId } = request.params as { pvpEventId: string };
        if (!pvpEventId) {
            return reply.status(400).send('Invalid PvP Event ID');
        }

        await this.service.deleteByPvPEventId(pvpEventId);

        return reply.status(200).send({ message: 'Character Disponibility deleted with success' });
    }
}