import { PermissionsDb } from '@prisma/client';
import { IPermissionsRepositories } from '../../../modules/adm/permissions/permissions.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaPermissionsRepositories extends PrismaBaseRepositories<PermissionsDb, string> implements IPermissionsRepositories {

    constructor() {
        super(prisma, (client) => client.permissionsDb);
    }

    async findByRoleId(roleId: string): Promise<PermissionsDb[]> {
        return await this.db.permissionsDb.findMany({ where: { roleId } });
    }

    async deleteByRoleId(roleId: string): Promise<void> {
        await this.db.permissionsDb.deleteMany({ where: { roleId } });
    }
}