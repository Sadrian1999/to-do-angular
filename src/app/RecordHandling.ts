import { Injectable } from "@angular/core";
import { Record } from "./Record";
import { NotFoundError } from "./NotFoundError";

@Injectable({
    providedIn: 'root',
})
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
