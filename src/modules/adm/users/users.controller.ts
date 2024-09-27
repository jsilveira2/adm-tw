import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersService } from './users.service';
import { userSchema, User, loginSchema, emailSchema } from './schema';
import { idSchema } from '../../utils/utils-schema';

export class UsersController {

  constructor(public readonly service: UsersService) { }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = loginSchema.parse(request.body);
    const user = await this.service.login(email, password);

    return userSchema.parse(user);
  }

  async get(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.service.findAll();

    return reply.status(200).send(users);
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params);
    if (!id) {
      return reply.status(400).send('Invalid User ID');
    }
    
    const users = await this.service.findById(id);

    return reply.status(200).send(users);
  }

  async getByEmail(request: FastifyRequest, reply: FastifyReply) {
    const { email } = emailSchema.parse(request.params);
    const users = await this.service.findByEmail(email);

    return reply.status(200).send(users);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const newUser: User = userSchema.parse(request.body);
    const user = await this.service.create(newUser);

    return reply.status(201).send(user);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params);
    if (!id) {
      return reply.status(400).send('Invalid User ID');
    }

    const updatedUser: User = userSchema.parse(request.body);
    const user = await this.service.update(id, updatedUser);

    return reply.status(200).send(user);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params);
    if (!id) {
      return reply.status(400).send('Invalid User ID');
    }

    await this.service.delete(id);
    
    return reply.status(200).send({ message: 'User deleted with success' });
  }
}