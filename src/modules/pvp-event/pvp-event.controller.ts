import { FastifyReply, FastifyRequest } from 'fastify';
import { PvPEventService } from './pvp-event.service';
import { pvpEventSchema } from './schema';
import { ControllerBase } from '../base/base.controller';

export class PvPEventController extends ControllerBase<typeof pvpEventSchema.shape> {
    constructor(public readonly service: PvPEventService) {
        super(service, pvpEventSchema);
    }

    async getByGuildId(request: FastifyRequest, reply: FastifyReply) {
        const { guildId } = request.params as { guildId: string };
        if (!guildId) {
            return reply.status(400).send('Invalid Guild ID');
        } else {
            const data = await this.service.findByGuildId(guildId);

            return reply.status(200).send(data);
        }
    }

    async getByGuildIdAndNotEnded(request: FastifyRequest, reply: FastifyReply) {
        const { guildId } = request.params as { guildId: string };
        if (!guildId) {
            return reply.status(400).send('Invalid Guild ID');
        } else {
            const data = await this.service.findByGuildAndNotEndedId(guildId);

            return reply.status(200).send(data);
        }
    }

    async deleteByGuildId(request: FastifyRequest, reply: FastifyReply) {
        const { guildId } = request.params as { guildId: string };
        if (!guildId) {
            return reply.status(400).send('Invalid Guild ID');
        }

        await this.service.deleteByGuildId(guildId);

        return reply.status(200).send({ message: 'PvPEvent deleted with success' });
    }
}