import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { UsersService } from './users.service';
import { userSchema, User } from './schema';

export class UsersController {

  constructor(public readonly userService: UsersService) { }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = userSchema.parse(request.body);
    const user = await this.userService.login(email, password);

    return userSchema.parse(user);
  }

  async get(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.userService.findAll();

    return reply.status(200).send(users);
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = userSchema.parse(request.params);
    if (!id) {
      return reply.status(400).send('Invalid User ID');
    }
    
    const users = await this.userService.findById(id);

    return reply.status(200).send(users);
  }

  async getByEmail(request: FastifyRequest, reply: FastifyReply) {
    const { email } = userSchema.parse(request.params);
    const users = await this.userService.findByEmail(email);

    return reply.status(200).send(users);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const newUser: User = userSchema.parse(request.body);
    const user = await this.userService.create(newUser);

    return reply.status(201).send(user);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = userSchema.parse(request.params);
    if (!id) {
      return reply.status(400).send('Invalid User ID');
    }

    const updatedUser: User = userSchema.parse(request.body);
    const user = await this.userService.update(id, updatedUser);

    return reply.status(200).send(user);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = userSchema.parse(request.params);
    if (!id) {
      return reply.status(400).send('Invalid User ID');
    }

    await this.userService.delete(id);
    
    return reply.status(200).send({ message: 'User deleted with success' });
  }
}