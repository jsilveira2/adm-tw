import { PrismaExternalPlayersRepositories } from '../../repositories/prisma/external-players/prisma-external-players.repositories';
import { ExternalPlayersController } from './external-players.controller';
import { ExternalPlayersService } from './external-players.service';
import { FactoryBase } from '../base/base.factory';

class ExternalPlayersFactory extends FactoryBase<ExternalPlayersController, ExternalPlayersService, PrismaExternalPlayersRepositories> {
    constructor() {
        super(PrismaExternalPlayersRepositories, ExternalPlayersService, ExternalPlayersController);
    }
}

export const externalPlayersFactory = new ExternalPlayersFactory().createControllerService();