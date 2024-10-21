import { FastifyReply, FastifyRequest } from 'fastify';
import { CharacterService } from './character.service';
import { characterSchema } from './schema';
import { ControllerBase } from '../base/base.controller';

export class CharacterController extends ControllerBase<typeof characterSchema.shape> {
    constructor(public readonly service: CharacterService) {
        super(service, characterSchema);
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

        return reply.status(200).send({ message: 'Character deleted with success' });
    }
}