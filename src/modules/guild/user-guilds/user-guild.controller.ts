import { FastifyReply, FastifyRequest } from 'fastify';
import { UserGuildService } from './user-guild.service';
import { userGuildSchema } from './schema';
import { ControllerBase } from '../../base/base.controller';

export class UserGuildController extends ControllerBase<typeof userGuildSchema.shape> {
    constructor(public readonly service: UserGuildService) {
        super(service, userGuildSchema);
    }

    async getByUserId(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string };
        if (!userId) {
            return reply.status(400).send('Invalid User ID');
        } else {
            const data = await this.service.findByUserId(userId);

            return reply.status(200).send(data);
        }
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

    async deleteByUserId(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string };
        if (!userId) {
            return reply.status(400).send('Invalid User ID');
        }

        await this.service.deleteByUserId(userId);

        return reply.status(200).send({ message: 'UserGuild deleted with success' });
    }

    async deleteByGuildId(request: FastifyRequest, reply: FastifyReply) {
        const { guildId } = request.params as { guildId: string };
        if (!guildId) {
            return reply.status(400).send('Invalid Guild ID');
        }

        await this.service.deleteByGuildId(guildId);

        return reply.status(200).send({ message: 'UserGuild deleted with success' });
    }
}