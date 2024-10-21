import { FastifyInstance } from 'fastify';
import { pvpEventPartyFactory } from '../../modules/pvp-event-party/pvp-event-party.factory';

export async function PvPEventParty(app: FastifyInstance) {
    app.get('/byPvPEventId/:pvpEventId', async (req, reply) => {
		await pvpEventPartyFactory.getByPvPEventId(req, reply);
	});
	app.get('/byName/:name', async (req, reply) => {
		await pvpEventPartyFactory.getByName(req, reply);
	});
	app.post('/', async (req, reply) => {
		await pvpEventPartyFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await pvpEventPartyFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await pvpEventPartyFactory.delete(req, reply);
	});
    app.delete('/byPvPEventId/:pvpEventId', async (req, reply) => {
		await pvpEventPartyFactory.deleteByPvPEventId(req, reply);
	});
}
