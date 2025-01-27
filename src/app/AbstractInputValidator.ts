export abstract class AbstractInputValidator<T>{
    protected data: T;

    constructor(data: T) {
        this.data = data;
    }
    abstract validate(): void;
    public getData(): T{
        return this.data;
    }
}
