export default interface RepositoryInterface<T> {
    save(entity: T): Promise<void>;
    find(id: string): Promise<T>;
}