import { PrismaPvPEventPartyRepositories } from '../../repositories/prisma/pvp-event/prisma-pvp-event-party.repositories';
import { PvPEventPartyController } from './pvp-event-party.controller';
import { PvPEventPartyService } from './pvp-event-party.service';
import { FactoryBase } from '../base/base.factory';

class PvPEventPartyFactory extends FactoryBase<PvPEventPartyController, PvPEventPartyService, PrismaPvPEventPartyRepositories> {
    constructor() {
        super(PrismaPvPEventPartyRepositories, PvPEventPartyService, PvPEventPartyController);
    }
}

export const pvpEventPartyFactory = new PvPEventPartyFactory().createControllerService();