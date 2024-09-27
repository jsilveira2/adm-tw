import { FastifyInstance } from 'fastify';
import { roleFactory } from '../../modules/adm/roles/roles.factory';

export async function Roles(app: FastifyInstance) {
	app.get('/:id', async (req, reply) => {
		await roleFactory.getById(req, reply);
	});
	app.post('/', async (req, reply) => {
		await roleFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await roleFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await roleFactory.delete(req, reply);
	});
}
