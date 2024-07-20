import { AbstractInputValidator } from "./AbstractInputValidator";

export class PriorityValidator extends AbstractInputValidator<number>{
    override validate(): void {
        if(this.data < 0 || this.data > 1){
            throw new Error("Priority can be only between 0 and 1");
        }
    }
}