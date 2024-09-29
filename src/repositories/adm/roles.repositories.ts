import { RolesDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';


export abstract class IRolesRepositories extends IBaseRepositories<RolesDb, string> {

}