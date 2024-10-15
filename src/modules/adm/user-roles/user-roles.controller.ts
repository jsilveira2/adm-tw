import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRolesService } from './user-roles.service';
import { userRolesSchema } from './schema';
import { ControllerBase } from '../../base/base.controller';

export class UserRolesController extends ControllerBase<typeof userRolesSchema.shape> {
    constructor(public readonly service: UserRolesService) {
        super(service, userRolesSchema);
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

    async getByRoleId(request: FastifyRequest, reply: FastifyReply) {
        const { roleId } = request.params as { roleId: string };
        if (!roleId) {
            return reply.status(400).send('Invalid Role ID');
        } else {
            const data = await this.service.findByRoleId(roleId);

            return reply.status(200).send(data);
        }
    }

    async deleteByUserId(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string };
        if (!userId) {
            return reply.status(400).send('Invalid User ID');
        }

        await this.service.deleteByUserId(userId);

        return reply.status(200).send({ message: 'UserRole deleted with success' });
    }

    async deleteByRoleId(request: FastifyRequest, reply: FastifyReply) {
        const { roleId } = request.params as { roleId: string };
        if (!roleId) {
            return reply.status(400).send('Invalid Role ID');
        }

        await this.service.deleteByRoleId(roleId);

        return reply.status(200).send({ message: 'UserRole deleted with success' });
    }
}