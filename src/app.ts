import fastify from 'fastify';
import multipart from '@fastify/multipart';
import { ErrorControllers } from './middleware/error';
import { FastifyInstance } from 'fastify/types/instance';
import { config } from 'dotenv';
import { Users, Login } from './routes/adm/users.routes';
import { Roles } from './routes/adm/roles.routes';
import { Permissions } from './routes/adm/permissions.routes';
import { UserRoles } from './routes/adm/user-roles.routes';
import { Guild } from './routes/guild/guild.routes';
import { UserGuild } from './routes/guild/user-guild.routes';
import { PvPEvent } from './routes/pvp-event/pvp-event.routes';
import { ExternalPlayers } from './routes/external-players/external-players.route';
import { ExternalPlayersDisponibility } from './routes/external-players/external-players-disponibility.route';

export class App {
    public readonly server: FastifyInstance;
    public errorControllers: ErrorControllers;

    constructor() {
        this.server = fastify();

        this.server.register(multipart);

        this.server.register(require('@fastify/cookie'), {
            secret: process.env.COOKIE_SECRET || 'supersecretcookie',
            parseOptions: {}
        });

        this.server.register(require('@fastify/jwt'), {
            secret: process.env.JWT_SECRET || 'supersecret'
        });

        this.server.addHook('preValidation', async (req, reply) => {
            const { url } = req.raw;
        
            if (url === '/login' || url === '/logout') {
                return;
            }
        
            try {
                const token = req.cookies.access_token;
                if (!token) {
                    throw new Error('No token provided');
                }
                await req.server.jwt.verify(token);
            } catch (err) {
                return reply.send(err);
            }
        });

        this.server.register(Login, { prefix: 'login' });
        this.server.register(Users, { prefix: 'users' });
        this.server.register(Roles, { prefix: 'roles' });
        this.server.register(Permissions, { prefix: 'permissions' });
        this.server.register(UserRoles, { prefix: 'user-roles' });
        this.server.register(Guild, { prefix: 'guild' });
        this.server.register(UserGuild, { prefix: 'user-guild' });
        this.server.register(PvPEvent, { prefix: 'pvp-event' });
        this.server.register(ExternalPlayers, { prefix: 'external-players' });
        this.server.register(ExternalPlayersDisponibility, { prefix: 'external-players-disponibility' });

        this.server.get('/logout', async (req, reply) => {
            // Remove cookie 'access_token'
            reply.setCookie('access_token', '', {
                path: '/',
                httpOnly: true,
                secure: true,
                expires: new Date(0),
            });

            return reply.status(200).send({ message: 'Logout successful' });
        }).after(() => {
            console.log(this.server.printRoutes());
        });

        this.errorControllers = new ErrorControllers();
        this.server.setErrorHandler(this.errorControllers.getUp);
        config();
    }
}