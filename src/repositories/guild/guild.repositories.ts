import { GuildDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';

export abstract class IGuildRepositories extends IBaseRepositories<GuildDb, string> {

}
