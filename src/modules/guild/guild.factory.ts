import { PrismaGuildRepositories } from '../../repositories/prisma/guild/prisma-guild.repositories';
import { GuildController } from './guild.controller';
import { GuildService } from './guild.service';

const GuildFactory = () => {
  const prismaRepositories = new PrismaGuildRepositories();
  const service = new GuildService(prismaRepositories);

  const controller = new GuildController(service);
  return controller;
}

export const guildFactory = GuildFactory();