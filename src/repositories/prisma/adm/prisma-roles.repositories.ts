import { RolesDb } from '@prisma/client';
import { IRolesRepositories } from '../../adm/roles.repositories';
import { prisma } from '../../../database/prisma';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';

export class PrismaRolesRepositories extends PrismaBaseRepositories<RolesDb, string> implements IRolesRepositories {

    constructor() {
        super(prisma, (client) => client.rolesDb);
    }
}
