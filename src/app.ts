import fastify from 'fastify';
import multipart from '@fastify/multipart';
import { ErrorControllers } from './middleware/error';
import { FastifyInstance } from 'fastify/types/instance';
import { oauth } from './oauth';
import { config } from 'dotenv';

export class App {
    public readonly server: FastifyInstance;
    public errorControllers: ErrorControllers;

    constructor() {
        this.server = fastify();

        this.server.register(oauth);
        this.server.register(multipart);

        this.errorControllers = new ErrorControllers();

        this.server.setErrorHandler(this.errorControllers.getUp);
        config();
    }
}