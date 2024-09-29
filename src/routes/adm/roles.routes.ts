import { FastifyInstance } from 'fastify';
import { rolesFactory } from '../../modules/adm/roles/roles.factory';

export async function Roles(app: FastifyInstance) {
	app.get('/', async (req, reply) => {
		await rolesFactory.get(req, reply);
	});
	app.get('/:id', async (req, reply) => {
		await rolesFactory.getById(req, reply);
	});
	app.post('/', async (req, reply) => {
		await rolesFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await rolesFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await rolesFactory.delete(req, reply);
	});
}
