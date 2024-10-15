import { PrismaPvPEventRepositories } from '../../repositories/prisma/pvp-event/prisma-pvp-event.repositories';
import { PvPEventController } from './pvp-event.controller';
import { PvPEventService } from './pvp-event.service';
import { FactoryBase } from '../base/base.factory';

class PvPEventFactory extends FactoryBase<PvPEventController, PvPEventService, PrismaPvPEventRepositories> {
    constructor() {
        super(PrismaPvPEventRepositories, PvPEventService, PvPEventController);
    }
}

export const pvpEventFactory = new PvPEventFactory().createControllerService();