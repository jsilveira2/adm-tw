import { FastifyInstance } from 'fastify';
import { userGuildFactory } from '../../modules/guild/user-guilds/user-guild.factory';

export async function UserGuild(app: FastifyInstance) {
	app.get('/userId/:userId', async (req, reply) => {
		await userGuildFactory.getByUserId(req, reply);
	});
	app.get('/guildId/:guildId', async (req, reply) => {
		await userGuildFactory.getByGuildId(req, reply);
	});
	app.delete('/userId/:userId', async (req, reply) => {
		await userGuildFactory.deleteByUserId(req, reply);
	});
    app.delete('/guildId/:guildId', async (req, reply) => {
		await userGuildFactory.deleteByGuildId(req, reply);
	});
}
