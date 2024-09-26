import { FastifyInstance } from 'fastify';
import { userFactory } from '../modules/adm/users/users.factory';

export async function Users(app: FastifyInstance) {
  app.get('/', async (req, reply) => {
    await userFactory.get(req, reply);
  });
  app.get('/:id', async (req, reply) => {
    await userFactory.getById(req, reply);
  });
  app.get('/byEmail/:email', async (req, reply) => {
    await userFactory.getByEmail(req, reply);
  });
  app.post('/', async (req, reply) => {
    await userFactory.create(req, reply);
  });
  app.patch('/:id', async (req, reply) => {
    await userFactory.update(req, reply);
  });
  app.delete('/:id', async (req, reply) => {
    await userFactory.delete(req, reply);
  });
}