import { GuildDb } from '@prisma/client';
import { IGuildRepositories } from '../../guild/guild.repositories';
import { prisma } from '../../../database/prisma';
import { PrismaBaseRepositories } from '../../prisma/base/prisma-base.repositories';

export class PrismaGuildRepositories extends PrismaBaseRepositories<GuildDb, string> implements IGuildRepositories {

    constructor() {
        super(prisma, (client) => client.guildDb);
    }
}
