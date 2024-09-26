import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fjwt, { FastifyJWT } from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fCookie from '@fastify/cookie';
import { userFactory } from './modules/adm/users/users.factory';
import { Users } from './routes/users.routes';

export async function oauth(fastify: FastifyInstance) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT_SECRET must be defined in the .env file');
    }

    fastify.register(fjwt, {
        secret: jwtSecret
    });

    fastify.register(fCookie, {
        secret: process.env.COOKIE_SECRET || 'some-secret-key',
        hook: 'preHandler',
    });

    fastify.register(fastifyCors, {
        origin: 'http://your-frontend-url', // Substitua pela URL do seu frontend
        credentials: true,
    });

    fastify.decorate(
        'authenticate',
        async (req: FastifyRequest, reply: FastifyReply) => {
            console.log(req)
            const token = req.cookies.access_token;
            if (!token) {
                return reply.status(401).send({ message: 'Authentication required' });
            }
    
            try {
                const decoded = req.jwt.verify<FastifyJWT['user']>(token);
                req.user = decoded;
            } catch (err) {
                return reply.status(401).send({ message: 'Invalid token' });
            }
        }
    );

    fastify.addHook('preHandler', (req, res, next) => {
        req.jwt = fastify.jwt;
        return next();
    });

    // Login route
    fastify.post('/login', async (req, reply) => {
        let user = await userFactory.login(req, reply);

        if (user) {
            const token = fastify.jwt.sign({ id: user.id, email: user.email });
            reply.setCookie('access_token', token, {
                path: '/',
                httpOnly: true,
                secure: true,
            });

            console.log(reply)
            return reply.status(201).send({
                access_token: token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        }
        return reply.status(401).send({ message: 'Invalid credentials' });
    });

    fastify.register(Users, { prefix: 'users' }).after(() => {
        console.log(fastify.printRoutes());
    });
}
