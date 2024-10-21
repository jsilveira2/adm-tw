import { PrismaPartyMembersRepositories } from '../../../repositories/prisma/pvp-event/prisma-pvp-event-party-members.repositories';
import { PartyMembersController } from './party-members.controller';
import { PartyMembersService } from './party-members.service';
import { FactoryBase } from '../../base/base.factory';

class PartyMembersFactory extends FactoryBase<PartyMembersController, PartyMembersService, PrismaPartyMembersRepositories> {
    constructor() {
        super(PrismaPartyMembersRepositories, PartyMembersService, PartyMembersController);
    }
}

export const partyMembersFactory = new PartyMembersFactory().createControllerService();