import { FastifyInstance } from 'fastify';
import { userPermissionsFactory } from '../../modules/adm/user-permissions/user-permissions.factory';

export async function UserPermissions(app: FastifyInstance) {
	app.get('/:id', async (req, reply) => {
		await userPermissionsFactory.getById(req, reply);
	});
    app.get('/byUserId/:userId', async (req, reply) => {
		await userPermissionsFactory.getByUserId(req, reply);
	});
    app.get('/byPermissionId/:permissionId', async (req, reply) => {
		await userPermissionsFactory.getByPermissionId(req, reply);
	});
	app.post('/', async (req, reply) => {
		await userPermissionsFactory.create(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await userPermissionsFactory.delete(req, reply);
	});
    app.delete('/byUserId/:userId', async (req, reply) => {
		await userPermissionsFactory.deleteByUserId(req, reply);
	});
	app.delete('/byPermissionId/:permissionId', async (req, reply) => {
		await userPermissionsFactory.deleteByPermissionId(req, reply);
	});
}
