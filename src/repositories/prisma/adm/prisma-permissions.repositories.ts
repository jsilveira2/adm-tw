import { PermissionsDb } from '@prisma/client';
import { Permission } from '../../../modules/adm/permissions/schema';
import { IPermissionsRepositories } from '../../adm/permissions.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaPermissionsRepositories implements IPermissionsRepositories {

    private readonly db = prisma.permissionsDb;

    async findById(id: string): Promise<PermissionsDb | null> {
        const data = await this.db.findUnique({ where: { id } });
        return data;
    }

    async findByRoleId(roleId: string): Promise<PermissionsDb[]> {
        const data = await this.db.findMany({ where: { roleId } });
        return data;
    }

    async save(obj: Permission): Promise<PermissionsDb> {
        const newObj = await this.db.create({
            data: { ...obj }
        });

        return newObj;
    }

    async update(obj: Permission): Promise<PermissionsDb> {
        const id = obj.id;
        const newObj = await this.db.update({
            where: { id },
            data: { ...obj }
        });

        return newObj;
    }

    async delete(id: string): Promise<void> {
        await this.db.delete({ where: { id } });
    }
}