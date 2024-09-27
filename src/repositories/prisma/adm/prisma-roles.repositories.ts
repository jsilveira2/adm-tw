import { RolesDb } from '@prisma/client';
import { Role } from '../../../modules/adm/roles/schema';
import { IRolesRepositories } from '../../adm/roles.repositories';
import { prisma } from '../../../database/prisma';

export class PrismaRolesRepositories implements IRolesRepositories {

    async findById(id: string): Promise<RolesDb | null> {
        const role = await prisma.rolesDb.findUnique({ where: { id } });
        return role;
    }

    async findByArrayIds(ids: string[]): Promise<RolesDb[]> {
        const data = await prisma.rolesDb.findMany({
            where: {
                id: {
                    in: ids,
                },
            }
        });

        return data;
    }

    async save(obj: Role): Promise<RolesDb> {
        const newObj = await prisma.rolesDb.create({
            data: { ...obj }
        });

        return newObj;
    }

    async update(obj: Role): Promise<RolesDb> {
        const id = obj.id;
        const newObj = await prisma.rolesDb.update({
            where: { id },
            data: { ...obj }
        });

        return newObj;
    }

    async delete(id: string): Promise<void> {
        await prisma.rolesDb.delete({ where: { id } });
    }
}