import { FastifyInstance } from 'fastify';
import { externalPlayersDisponibilityFactory } from '../../modules/external-players/external-players-disponibility/external-players-disponibility.factory';

export async function ExternalPlayersDisponibility(app: FastifyInstance) {
    app.get('/byPvPEvent/:pvpEventId', async (req, reply) => {
		await externalPlayersDisponibilityFactory.getByPvPEventId(req, reply);
	});
	app.get('/ByPvPEventIdAndDisponibilityYes/:pvpEventId', async (req, reply) => {
		await externalPlayersDisponibilityFactory.getByPvPEventIdAndDisponibilityYes(req, reply);
	});
	app.post('/', async (req, reply) => {
		await externalPlayersDisponibilityFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await externalPlayersDisponibilityFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await externalPlayersDisponibilityFactory.delete(req, reply);
	});
    app.delete('/byPvPEvent/:pvpEventId', async (req, reply) => {
		await externalPlayersDisponibilityFactory.deleteByPvPEventId(req, reply);
	});
}
