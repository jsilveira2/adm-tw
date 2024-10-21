import { FastifyInstance } from 'fastify';
import { partyMembersFactory } from '../../modules/pvp-event-party/party-members/party-members.factory';

export async function PartyMembers(app: FastifyInstance) {
    app.get('/byPartyId/:partyId', async (req, reply) => {
		await partyMembersFactory.getByPartyId(req, reply);
	});
	app.get('/ByCharacter/:characterId', async (req, reply) => {
		await partyMembersFactory.getByCharacterId(req, reply);
	});
	app.post('/', async (req, reply) => {
		await partyMembersFactory.create(req, reply);
	});
	app.patch('/:id', async (req, reply) => {
		await partyMembersFactory.update(req, reply);
	});
	app.delete('/:id', async (req, reply) => {
		await partyMembersFactory.delete(req, reply);
	});
    app.delete('/byPartyId/:partyId', async (req, reply) => {
		await partyMembersFactory.deleteByPartyId(req, reply);
	});
}
