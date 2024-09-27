import { RolesDb } from '@prisma/client';
import { Role } from '../../../modules/adm/roles/schema';
import { IRolesRepositories } from '../../adm/roles.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaRolesRepositories implements IRolesRepositories {

    private readonly db = prisma.rolesDb;

    async findById(id: string): Promise<RolesDb | null> {
        const data = await this.db.findUnique({ where: { id } });
        return data;
    }

    async findByArrayIds(ids: string[]): Promise<RolesDb[]> {
        const data = await this.db.findMany({
            where: {
                id: {
                    in: ids,
                },
            }
        });

        return data;
    }

    async save(obj: Role): Promise<RolesDb> {
        const newObj = await this.db.create({
            data: { ...obj }
        });

        return newObj;
    }

    async update(obj: Role): Promise<RolesDb> {
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