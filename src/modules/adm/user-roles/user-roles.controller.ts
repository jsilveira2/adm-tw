import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRolesService } from './user-roles.service';
import { userRolesSchema, UserRoles } from './schema';
import { idSchema } from '../../utils/utils-schema';

export class UserRolesController {

    constructor(public readonly service: UserRolesService) { }

    async getById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid UserRole ID');
        }

        const data = await this.service.findById(id);

        return reply.status(200).send(data);
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

    async create(request: FastifyRequest, reply: FastifyReply) {
        const obj: UserRoles = userRolesSchema.parse(request.body);
        const data = await this.service.create(obj);

        return reply.status(201).send(data);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid UserRole ID');
        }

        await this.service.delete(id);

        return reply.status(200).send({ message: 'UserRole deleted with success' });
    }

    async deleteByUserId(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string };
        if (!userId) {
            return reply.status(400).send('Invalid User ID');
        }

        await this.service.deleteByRoleId(userId);

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