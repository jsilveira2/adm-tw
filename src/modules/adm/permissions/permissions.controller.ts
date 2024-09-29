import { FastifyReply, FastifyRequest } from 'fastify';
import { PermissionsService } from './permissions.service';
import { permissionSchema } from './schema';
import { ControllerBase } from '../../base/base.controller';

export class PermissionsController extends ControllerBase<typeof permissionSchema.shape> {
    constructor(public readonly service: PermissionsService) {
        super(service, permissionSchema);
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

    async deleteByRoleId(request: FastifyRequest, reply: FastifyReply) {
        const { roleId } = request.params as { roleId: string };
        if (!roleId) {
            return reply.status(400).send('Invalid Role ID');
        }

        await this.service.deleteByRoleId(roleId);

        return reply.status(200).send({ message: 'Permission deleted with success' });
    }
}