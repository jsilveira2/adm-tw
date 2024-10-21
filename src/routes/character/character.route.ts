import { FastifyInstance } from 'fastify';
import { characterFactory } from '../../modules/character/character.factory';

export async function Character(app: FastifyInstance) {
    app.get('/:id', async (req, reply) => {
		await characterFactory.getById(req, reply);
	});
    app.get('/byGuildId/:guildId', async (req, reply) => {
		await characterFactory.getByGuildId(req, reply);
	});
	app.post('/', async (req, reply) => {
		await characterFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await characterFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await characterFactory.delete(req, reply);
	});
    app.delete('/byGuildId/:guildId', async (req, reply) => {
		await characterFactory.deleteByGuildId(req, reply);
	});
}
