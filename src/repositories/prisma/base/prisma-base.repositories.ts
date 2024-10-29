import { PrismaClient } from '@prisma/client';
import { IBaseRepositories } from '../../../modules/base/base.repositories';

export abstract class PrismaBaseRepositories<T, K> implements IBaseRepositories<T, K> {
    protected db: PrismaClient;
    protected modelName: (client: PrismaClient) => {
        findMany: (args?: { include?: any }) => Promise<T[]>;
        findUnique: (args: { where: { id: K }, include?: any }) => Promise<T | null>;
        create: (args: { data: T }) => Promise<T>;
        update: (args: { where: { id: K }, data: T }) => Promise<T>;
        delete: (args: { where: { id: K } }) => Promise<void>;
    };

    constructor(prismaClient: PrismaClient, modelName: (client: PrismaClient) => any) {
        this.db = prismaClient;
        this.modelName = modelName;
    }

    async findAll(include?: any): Promise<T[]> {
        return await this.modelName(this.db).findMany({ include });
    }

    async findById(id: K, include?: any): Promise<T | null> {
        return await this.modelName(this.db).findUnique({
            where: { id },
            include
        });
    }

    async save(obj: T): Promise<T> {
        return await this.modelName(this.db).create({ data: { ...obj } });
    }

    async update(obj: T): Promise<T> {
        const id = (obj as any).id;
        return await this.modelName(this.db).update({
            where: { id },
            data: { ...obj }
        });
    }

    async delete(id: K): Promise<void> {
        await this.modelName(this.db).delete({ where: { id } });
    }
}
