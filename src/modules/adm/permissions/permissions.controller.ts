import { FastifyReply, FastifyRequest } from 'fastify';
import { PermissionsService } from './permissions.service';
import { permissionSchema, Permission } from './schema';
import { idSchema } from '../../utils/utils-schema';

export class PermissionsController {

    constructor(public readonly service: PermissionsService) { }

    async getById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid Permission ID');
        }

        const data = await this.service.findById(id);

        return reply.status(200).send(data);
    }

    async getByRoleId(request: FastifyRequest, reply: FastifyReply) {
        const { roleId } = request.params as { roleId: string };
        if (!roleId) {
            return reply.status(400).send('Invalid Role IDs');
        } else {
            const data = await this.service.findByRoleId(roleId);

            return reply.status(200).send(data);
        }
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const obj: Permission = permissionSchema.parse(request.body);
        const data = await this.service.create(obj);

        return reply.status(201).send(data);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid Permission ID');
        }

        const obj: Permission = permissionSchema.parse(request.body);
        const data = await this.service.update(id, obj);

        return reply.status(200).send(data);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid Permission ID');
        }

        await this.service.delete(id);

        return reply.status(200).send({ message: 'Permission deleted with success' });
    }
}