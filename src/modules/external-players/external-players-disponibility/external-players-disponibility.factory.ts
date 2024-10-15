import { PrismaExternalPlayersDisponibilityRepositories } from '../../../repositories/prisma/external-players/prisma-external-players-disponibility.repositories';
import { ExternalPlayersDisponibilityController } from './external-players-disponibility.controller';
import { ExternalPlayersDisponibilityService } from './external-players-disponibility.service';
import { FactoryBase } from '../../base/base.factory';

class ExternalPlayersDisponibilityFactory extends FactoryBase<ExternalPlayersDisponibilityController, ExternalPlayersDisponibilityService, PrismaExternalPlayersDisponibilityRepositories> {
    constructor() {
        super(PrismaExternalPlayersDisponibilityRepositories, ExternalPlayersDisponibilityService, ExternalPlayersDisponibilityController);
    }
}

export const externalPlayersDisponibilityFactory = new ExternalPlayersDisponibilityFactory().createControllerService();