import fastify from 'fastify';
import multipart from '@fastify/multipart';
import { Users } from './routes/users.routes';
import { ErrorControllers } from './middleware/error';
import { FastifyInstance } from 'fastify/types/instance';

export class App {
  public readonly server: FastifyInstance
  public errorControllers: ErrorControllers

  constructor() {
    this.server = fastify()
    this.errorControllers = new ErrorControllers()

    this.server.register(multipart)
    this.server
      .register(Users, {
        prefix: 'users',
      })
      .after(() => {
        console.log(this.server.printRoutes())
      });

    this.server.setErrorHandler(this.errorControllers.getUp)
  }
}