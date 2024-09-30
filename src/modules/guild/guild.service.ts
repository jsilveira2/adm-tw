import { GuildDb } from '@prisma/client';
import { IGuildRepositories } from './guild.repositories';
import { ServiceBase } from '../base/base.service';

export class GuildService extends ServiceBase<GuildDb, string> {
    constructor(repository: IGuildRepositories) {
        super(repository, 'GuildService');
    }
}
