import { FastifyInstance } from 'fastify';
import { userRolesFactory } from '../../modules/adm/user-roles/user-roles.factory';

export async function UserRoles(app: FastifyInstance) {
	app.get('/:id', async (req, reply) => {
		await userRolesFactory.getById(req, reply);
	});
    app.get('/byUserId/:userId', async (req, reply) => {
		await userRolesFactory.getByUserId(req, reply);
	});
    app.get('/byRoleId/:roleId', async (req, reply) => {
		await userRolesFactory.getByRoleId(req, reply);
	});
	app.post('/', async (req, reply) => {
		await userRolesFactory.create(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await userRolesFactory.delete(req, reply);
	});
    app.delete('/byUserId/:userId', async (req, reply) => {
		await userRolesFactory.deleteByUserId(req, reply);
	});
	app.delete('/byRoleId/:roleId', async (req, reply) => {
		await userRolesFactory.deleteByRoleId(req, reply);
	});
}
