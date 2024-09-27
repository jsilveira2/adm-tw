import { FastifyInstance } from 'fastify';
import { userFactory } from '../modules/adm/users/users.factory';

export async function Users(app: FastifyInstance) {
	app.get('/', async (req, reply) => {
		await userFactory.get(req, reply);
	});
	app.get('/:id', async (req, reply) => {
		await userFactory.getById(req, reply);
	});
	app.get('/byEmail/:email', async (req, reply) => {
		await userFactory.getByEmail(req, reply);
	});
	app.post('/', async (req, reply) => {
		await userFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await userFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await userFactory.delete(req, reply);
	});
}

export async function Login(app: FastifyInstance) {
	app.post('/', async (req, reply) => {
		let user = await userFactory.login(req, reply);
		if (user) {
			const token = req.server.jwt.sign({ id: user.id, email: user.email });
			const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
			reply.setCookie('access_token', token, {
				path: '/',
				httpOnly: true,
				secure: true,
				expires: oneWeekFromNow
			});

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
}