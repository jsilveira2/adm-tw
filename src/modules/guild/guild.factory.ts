import { PrismaGuildRepositories } from '../../repositories/prisma/guild/prisma-guild.repositories';
import { GuildController } from './guild.controller';
import { GuildService } from './guild.service';
import { FactoryBase } from '../base/base.factory';

class GuildFactory extends FactoryBase<GuildController, GuildService, PrismaGuildRepositories> {
    constructor() {
        super(PrismaGuildRepositories, GuildService, GuildController);
    }
}

export const guildFactory = new GuildFactory().createControllerService();
