import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersService } from './users.service';
import { userSchema, loginSchema, emailSchema, updateUserSchema } from './schema';
import { ControllerBase } from '../../base/base.controller';
import { idSchema } from '../../utils/utils-schema';

export class UsersController extends ControllerBase<typeof userSchema.shape> {
	constructor(public readonly service: UsersService) {
        super(service, userSchema);
    }

	async login(request: FastifyRequest, reply: FastifyReply) {
		const { email, password } = loginSchema.parse(request.body);
		const user = await this.service.login(email, password);

		return userSchema.parse(user);
	}

	async getByEmail(request: FastifyRequest, reply: FastifyReply) {
		const { email } = emailSchema.parse(request.params);
		const users = await this.service.findByEmail(email);

		return reply.status(200).send(users);
	}

	async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idSchema.parse(request.params);
        if (!id) {
            return reply.status(400).send('Invalid ID');
        }
        const obj = updateUserSchema.parse(request.body);
        const data = await this.service.update(id, obj);
        return reply.status(200).send(data);
    }
}