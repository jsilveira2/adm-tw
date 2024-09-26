import { FastifyInstance } from 'fastify';
import { userFactory } from '../modules/adm/users/users.factory';

export async function Users(app: FastifyInstance) {
  app.get('/', { onRequest: [app.authenticate] }, async (req, reply) => {
    await userFactory.get(req, reply);
  });
  app.get('/:id', { onRequest: [app.authenticate] }, async (req, reply) => {
    await userFactory.getById(req, reply);
  });
  app.get('/byEmail/:email', { onRequest: [app.authenticate] }, async (req, reply) => {
    await userFactory.getByEmail(req, reply);
  });
  app.post('/', { onRequest: [app.authenticate] }, async (req, reply) => {
    await userFactory.create(req, reply);
  });
  app.patch('/:id', { onRequest: [app.authenticate] }, async (req, reply) => {
    await userFactory.update(req, reply);
  });
  app.delete('/:id', { onRequest: [app.authenticate] }, async (req, reply) => {
    await userFactory.delete(req, reply);
  });
}