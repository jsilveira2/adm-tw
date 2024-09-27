import { UserRolesDb } from '@prisma/client';
import { UserRoles } from '../../../modules/adm/user-roles/schema';
import { IUserRolesRepositories } from '../../adm/user-roles.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaUserRolesRepositories implements IUserRolesRepositories {

    private readonly db = prisma.userRolesDb;

    async findById(id: string): Promise<UserRolesDb | null> {
        const data = await this.db.findUnique({ where: { id } });
        return data;
    }

    async findByUserId(userId: string): Promise<UserRolesDb[]> {
        const data = await this.db.findMany({
            where: { userId }
        });

        return data;
    }

    async findByRoleId(roleId: string): Promise<UserRolesDb[]> {
        const data = await this.db.findMany({
            where: { roleId }
        });

        return data;
    }

    async save(obj: UserRoles): Promise<UserRolesDb> {
        const newObj = await this.db.create({
            data: { ...obj }
        });

        return newObj;
    }

    async delete(id: string): Promise<void> {
        await this.db.delete({ where: { id } });
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.db.deleteMany({ where: { userId } });
    }

    async deleteByRoleId(roleId: string): Promise<void> {
        await this.db.deleteMany({ where: { roleId } });
    }
}