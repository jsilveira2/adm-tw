export abstract class FactoryBase<C, S, R> {
    constructor(
        private readonly RepositoryClass: new () => R,
        private readonly ServiceClass: new (repository: R) => S,
        private readonly ControllerClass: new (service: S) => C
    ) {}

    createControllerService(): C {
        const repository = new this.RepositoryClass();
        const service = new this.ServiceClass(repository);
        const controller = new this.ControllerClass(service);
        return controller;
    }
}
