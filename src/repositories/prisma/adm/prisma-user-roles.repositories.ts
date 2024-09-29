import { UserRolesDb } from '@prisma/client';
import { IUserRolesRepositories } from '../../adm/user-roles.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaUserRolesRepositories extends PrismaBaseRepositories<UserRolesDb, string> implements IUserRolesRepositories {

    constructor() {
        super(prisma, (client) => client.permissionsDb);
    }

    async findByUserId(userId: string): Promise<UserRolesDb[]> {
        const data = await this.db.userRolesDb.findMany({
            where: { userId }
        });

        return data;
    }

    async findByRoleId(roleId: string): Promise<UserRolesDb[]> {
        const data = await this.db.userRolesDb.findMany({
            where: { roleId }
        });

        return data;
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.db.userRolesDb.deleteMany({ where: { userId } });
    }

    async deleteByRoleId(roleId: string): Promise<void> {
        await this.db.userRolesDb.deleteMany({ where: { roleId } });
    }
}