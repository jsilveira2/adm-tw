import { FastifyInstance } from 'fastify';
import { guildFactory } from '../../modules/guild/guild.factory';

export async function Guild(app: FastifyInstance) {
    app.get('/', async (req, reply) => {
		await guildFactory.get(req, reply);
	});
	app.get('/:id', async (req, reply) => {
		await guildFactory.getById(req, reply);
	});
	app.post('/', async (req, reply) => {
		await guildFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await guildFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await guildFactory.delete(req, reply);
	});
}
