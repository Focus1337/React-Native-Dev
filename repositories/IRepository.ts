export interface IRepository<Type> {
    // getAsync: (id: number) => Promise<Type>;
    getAllAsync: () => Promise<Type[]>;
    // addAsync: (item: Type) => Promise<void>;
    // removeAsync: (id: number) => Promise<void>;
}
