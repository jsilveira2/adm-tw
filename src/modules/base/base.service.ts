import { ErrorHelper } from '../../helpers/error-helper';

export abstract class ServiceBase<T, K> {
    public readonly className: string;

    constructor(public repository: any, className: string) {
        this.className = className;
    }

    async findAll(): Promise<T[]> {
        return await this.repository.findAll();
    }

    async findById(id: K): Promise<T> {
        const findData = await this.repository.findById(id);
        if (!findData) {
            throw new ErrorHelper(this.className, 'findById', `${this.className} not found`, 404);
        }
        return findData;
    }

    async create(obj: T): Promise<T> {
        return await this.repository.save(obj);
    }

    async update(id: K, obj: T): Promise<T> {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new ErrorHelper(this.className, 'update', `${this.className} not found`, 404);
        }

        (obj as T & { updatedAt: Date }).updatedAt = new Date();
        return await this.repository.update(obj);
    }

    async delete(id: K): Promise<void> {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new ErrorHelper(this.className, 'delete', `${this.className} not found`, 404);
        }

        await this.repository.delete(id);
    }
}
