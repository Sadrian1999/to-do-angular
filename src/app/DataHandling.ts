export interface Record{
  id: number;
  priority: number;
  description: string;
}

export class NotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NotFoundError';
    }
  }
  
export class RecordHandling{
    private records: Record[] = [];

    public getRecords(): Record[]{
        return this.records;
    }
    public getRecord(record?: Record, id?: number, description?: string): Record {
        if (!record && !id && !description) {
          throw new Error("Can't search with no parameters!");
        }
        for (const element of this.records) {
          if (element.id === id || element === record || element.description === description) {
            return element;
          }
        }
        throw new NotFoundError("Record doesn't exist!");
    }
    public addRecord(record: Record): void{
        this.records.push(record);
    }
    public removeRecord(record?: Record, id?: number, description?: string): Record | null{
        let recordToRemove: Record | null = null;
        try {
            if (record) {
                recordToRemove = record;
            }
            else if(id) {
                recordToRemove = this.getRecord(undefined, id);
            }
            else {
                recordToRemove = this.getRecord(undefined, undefined, description);
            }
        } 
        catch (error){
            if(error instanceof NotFoundError){
                throw new NotFoundError("Record doesn't exists!");
            }
        }
        if (recordToRemove){
            this.records = this.records.filter(item => item !== recordToRemove);
        }
        return recordToRemove;
    }
}
export abstract class AbstractInputValidator<T>{
    protected data: T;

    constructor(data: T) {
        this.data = data;
    }
    abstract validate(): void;
}
export class DescriptionValidator extends AbstractInputValidator<string>{
    private removeSpecialCharacters(input: string): string {
        return input.replace(/[^a-zA-Z0-9\s]/g, '');
    }

    override validate(): void {
        this.data = this.removeSpecialCharacters(this.data);
    }
}
export class PriorityValidator extends AbstractInputValidator<number>{
    override validate(): void {
        if(this.data < 0 && this.data > 1){
            throw new Error("Priority can be only between 0 and 1");
        }
    }
}