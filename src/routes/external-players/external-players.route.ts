import { FastifyInstance } from 'fastify';
import { externalPlayersFactory } from '../../modules/external-players/external-players.factory';

export async function ExternalPlayers(app: FastifyInstance) {
    app.get('/:id', async (req, reply) => {
		await externalPlayersFactory.getById(req, reply);
	});
    app.get('/byGuildId/:guildId', async (req, reply) => {
		await externalPlayersFactory.getByGuildId(req, reply);
	});
	app.post('/', async (req, reply) => {
		await externalPlayersFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await externalPlayersFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await externalPlayersFactory.delete(req, reply);
	});
    app.delete('/byGuildId/:guildId', async (req, reply) => {
		await externalPlayersFactory.deleteByGuildId(req, reply);
	});
}
