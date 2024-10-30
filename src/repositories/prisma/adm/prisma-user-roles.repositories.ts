import { UserRolesDb } from '@prisma/client';
import { IUserRolesRepositories } from '../../../modules/adm/user-roles/user-roles.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';
import { UserRoles } from '../../../modules/adm/user-roles/schema';

export class PrismaUserRolesRepositories extends PrismaBaseRepositories<UserRolesDb, string> implements IUserRolesRepositories {

    constructor() {
        super(prisma, (client) => client.userRolesDb);
    }

    async findByUserId(userId: string): Promise<UserRolesDb[]> {
        const data = await this.db.userRolesDb.findMany({
            where: { userId },
            include: { role: true }
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

    async createMany(obj: UserRoles[]): Promise<UserRolesDb[]> {
        const data = await this.db.userRolesDb.createMany({
            data: obj.map(userRole => ({
                userId: userRole.userId,
                roleId: userRole.roleId
            })),
        });

        const createdRoles = await this.db.userRolesDb.findMany({
            where: { userId: obj[0].userId }
        });

        return createdRoles;
    }
}