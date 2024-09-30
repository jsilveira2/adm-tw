export abstract class IBaseRepositories<T, K> {
    abstract findAll(): Promise<T[]>;
    abstract findById(id: K): Promise<T | null>;
    abstract save(obj: T): Promise<T>;
    abstract update(obj: T): Promise<T>;
    abstract delete(id: K): Promise<void>;
}
