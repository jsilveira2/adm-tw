import { RolesDb } from '@prisma/client';
import { IRolesRepositories } from '../../../repositories/adm/roles.repositories';
import { ServiceBase } from '../../base/base.service';

export class RolesService extends ServiceBase<RolesDb, string> {
    constructor(repository: IRolesRepositories) {
        super(repository, 'RolesService');
    }
}