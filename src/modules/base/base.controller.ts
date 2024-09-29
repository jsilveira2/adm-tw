import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodObject, ZodRawShape, ZodTypeAny } from 'zod';
import { idSchema } from '../utils/utils-schema';

export abstract class ControllerBase<T extends ZodRawShape> {
    constructor(
        public readonly service: any,
        private readonly schema: ZodObject<T, "strip", ZodTypeAny>
    ) {}

    async get(request: FastifyRequest, reply: FastifyReply) {
        const data = await this.service.findAll();
        return reply.status(200).send(data);
    }

    async getById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid ID');
        }
        const data = await this.service.findById(id);
        return reply.status(200).send(data);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const obj = this.schema.parse(request.body);
        const data = await this.service.create(obj);
        return reply.status(201).send(data);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid ID');
        }
        const obj = this.schema.parse(request.body);
        const data = await this.service.update(id, obj);
        return reply.status(200).send(data);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid ID');
        }
        await this.service.delete(id);
        return reply.status(200).send({ message: 'Deleted with success' });
    }
}
