import { FastifyReply, FastifyRequest } from 'fastify';
import { RolesService } from './roles.service';
import { roleSchema, Role } from './schema';
import { idSchema, arrayOfIdsSchema } from '../../utils/utils-schema';

export class RolesController {

	constructor(public readonly service: RolesService) { }

	async getById(request: FastifyRequest, reply: FastifyReply) {
		const { id } = idSchema.parse(request.params);
		if (!id) {
			return reply.status(400).send('Invalid Role ID');
		}

		const data = await this.service.findById(id);

		return reply.status(200).send(data);
	}
	async create(request: FastifyRequest, reply: FastifyReply) {
		const obj: Role = roleSchema.parse(request.body);
		const data = await this.service.create(obj);

		return reply.status(201).send(data);
	}

	async update(request: FastifyRequest, reply: FastifyReply) {
		const { id } = idSchema.parse(request.params);
		if (!id) {
			return reply.status(400).send('Invalid Role ID');
		}

		const obj: Role = roleSchema.parse(request.body);
		const data = await this.service.update(id, obj);

		return reply.status(200).send(data);
	}

	async delete(request: FastifyRequest, reply: FastifyReply) {
		const { id } = idSchema.parse(request.params);
		if (!id) {
			return reply.status(400).send('Invalid Role ID');
		}

		await this.service.delete(id);

		return reply.status(200).send({ message: 'Role deleted with success' });
	}
}