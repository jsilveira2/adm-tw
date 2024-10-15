import { FastifyReply, FastifyRequest } from 'fastify';
import { ExternalPlayersService } from './external-players.service';
import { externalPlayersSchema } from './schema';
import { ControllerBase } from '../base/base.controller';

export class ExternalPlayersController extends ControllerBase<typeof externalPlayersSchema.shape> {
    constructor(public readonly service: ExternalPlayersService) {
        super(service, externalPlayersSchema);
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

    async deleteByGuildId(request: FastifyRequest, reply: FastifyReply) {
        const { guildId } = request.params as { guildId: string };
        if (!guildId) {
            return reply.status(400).send('Invalid Guild ID');
        }

        await this.service.deleteByGuildId(guildId);

        return reply.status(200).send({ message: 'External Player deleted with success' });
    }
}