import { FastifyReply, FastifyRequest } from 'fastify';
import { UserPermissionsService } from './user-permissions.service';
import { userPermissionsSchema } from './schema';
import { ControllerBase } from '../../base/base.controller';

export class UserPermissionsController extends ControllerBase<typeof userPermissionsSchema.shape> {
    constructor(public readonly service: UserPermissionsService) {
        super(service, userPermissionsSchema);
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

    async getByPermissionId(request: FastifyRequest, reply: FastifyReply) {
        const { permissionId } = request.params as { permissionId: string };
        if (!permissionId) {
            return reply.status(400).send('Invalid Permission ID');
        } else {
            const data = await this.service.findByPermissionId(permissionId);

            return reply.status(200).send(data);
        }
    }

    async deleteByUserId(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string };
        if (!userId) {
            return reply.status(400).send('Invalid User ID');
        }

        await this.service.deleteByUserId(userId);

        return reply.status(200).send({ message: 'UserPermission deleted with success' });
    }

    async deleteByPermissionId(request: FastifyRequest, reply: FastifyReply) {
        const { permissionId } = request.params as { permissionId: string };
        if (!permissionId) {
            return reply.status(400).send('Invalid Permission ID');
        }

        await this.service.deleteByPermissionId(permissionId);

        return reply.status(200).send({ message: 'UserPermission deleted with success' });
    }
}