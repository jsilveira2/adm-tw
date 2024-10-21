import { FastifyInstance } from 'fastify';
import { characterDisponibilityFactory } from '../../modules/character/character-disponibility/character-disponibility.factory';

export async function CharacterDisponibility(app: FastifyInstance) {
    app.get('/byPvPEvent/:pvpEventId', async (req, reply) => {
		await characterDisponibilityFactory.getByPvPEventId(req, reply);
	});
    app.get('/ByPvPEventIdAndDisponibilityYes/:pvpEventId', async (req, reply) => {
		await characterDisponibilityFactory.getByPvPEventIdAndDisponibilityYes(req, reply);
	});
	app.post('/', async (req, reply) => {
		await characterDisponibilityFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await characterDisponibilityFactory.update(req, reply);
	});
    app.delete('/:id', async (req, reply) => {
		await characterDisponibilityFactory.delete(req, reply);
	});
    app.delete('/byPvPEvent/:pvpEventId', async (req, reply) => {
		await characterDisponibilityFactory.deleteByPvPEventId(req, reply);
	});
}
