import { UserPermissionsDb } from '@prisma/client';
import { IUserPermissionsRepositories } from '../../../modules/adm/user-permissions/user-permissions.repositories';
import { PrismaBaseRepositories } from '../base/prisma-base.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaUserPermissionsRepositories extends PrismaBaseRepositories<UserPermissionsDb, string> implements IUserPermissionsRepositories {

    constructor() {
        super(prisma, (client) => client.userPermissionsDb);
    }

    async findByUserId(userId: string): Promise<UserPermissionsDb[]> {
        const data = await this.db.userPermissionsDb.findMany({
            where: { userId }
        });

        return data;
    }

    async findByPermissionId(permissionId: string): Promise<UserPermissionsDb[]> {
        const data = await this.db.userPermissionsDb.findMany({
            where: { permissionId }
        });

        return data;
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.db.userPermissionsDb.deleteMany({ where: { userId } });
    }

    async deleteByPermissionId(permissionId: string): Promise<void> {
        await this.db.userPermissionsDb.deleteMany({ where: { permissionId } });
    }
}