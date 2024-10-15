import { FastifyInstance } from 'fastify';
import { pvpEventFactory } from '../../modules/pvp-event/pvp-event.factory';

export async function PvPEvent(app: FastifyInstance) {
    app.get('/byGuildId/:guildId', async (req, reply) => {
		await pvpEventFactory.getByGuildId(req, reply);
	});
	app.get('/byGuildIdNotEnded/:guildId', async (req, reply) => {
		await pvpEventFactory.getByGuildIdAndNotEnded(req, reply);
	});
	app.post('/', async (req, reply) => {
		await pvpEventFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await pvpEventFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await pvpEventFactory.delete(req, reply);
	});
}
