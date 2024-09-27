import { FastifyReply, FastifyRequest } from 'fastify';
import { GuildService } from './guild.service';
import { guildSchema, Guild } from './schema';
import { idSchema } from '../utils/utils-schema';

export class GuildController {

	constructor(public readonly service: GuildService) { }

    async get(request: FastifyRequest, reply: FastifyReply) {
		const data = await this.service.findAll();

		return reply.status(200).send(data);
	}

	async getById(request: FastifyRequest, reply: FastifyReply) {
		const { id } = idSchema.parse(request.params);
		if (!id) {
			return reply.status(400).send('Invalid Guild ID');
		}

		const data = await this.service.findById(id);

		return reply.status(200).send(data);
	}

	async create(request: FastifyRequest, reply: FastifyReply) {
		const obj: Guild = guildSchema.parse(request.body);
		const data = await this.service.create(obj);

		return reply.status(201).send(data);
	}

	async update(request: FastifyRequest, reply: FastifyReply) {
		const { id } = idSchema.parse(request.params);
		if (!id) {
			return reply.status(400).send('Invalid Guild ID');
		}

		const obj: Guild = guildSchema.parse(request.body);
		const data = await this.service.update(id, obj);

		return reply.status(200).send(data);
	}

	async delete(request: FastifyRequest, reply: FastifyReply) {
		const { id } = idSchema.parse(request.params);
		if (!id) {
			return reply.status(400).send('Invalid Guild ID');
		}

		await this.service.delete(id);

		return reply.status(200).send({ message: 'Guild deleted with success' });
	}
}