import { PrismaUserGuildRepositories } from '../../../repositories/prisma/guild/prisma-user-guild.repositories';
import { UserGuildController } from './user-guild.controller';
import { UserGuildService } from './user-guild.service';
import { FactoryBase } from '../../base/base.factory';

class UserGuildFactory extends FactoryBase<UserGuildController, UserGuildService, PrismaUserGuildRepositories> {
    constructor() {
        super(PrismaUserGuildRepositories, UserGuildService, UserGuildController);
    }
}

export const userGuildFactory = new UserGuildFactory().createControllerService();