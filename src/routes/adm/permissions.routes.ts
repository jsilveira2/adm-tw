import { FastifyInstance } from 'fastify';
import { permissionFactory } from '../../modules/adm/permissions/permissions.factory';

export async function Permissions(app: FastifyInstance) {
	app.get('/:id', async (req, reply) => {
		await permissionFactory.getById(req, reply);
	});
    app.get('/byRoleId/:roleId', async (req, reply) => {
		await permissionFactory.getByRoleId(req, reply);
	});
	app.post('/', async (req, reply) => {
		await permissionFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await permissionFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await permissionFactory.delete(req, reply);
	});
	app.delete('/byRoles/:roleId', async (req, reply) => {
		await permissionFactory.deleteByRoleId(req, reply);
	});
}
