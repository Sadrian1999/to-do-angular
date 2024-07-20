import { AbstractInputValidator } from "./AbstractInputValidator";

export class DescriptionValidator extends AbstractInputValidator<string>{
    constructor(data: string){
        super(data);
    }
    private removeSpecialCharacters(input: string): string {
        return input.replace(/[^a-zA-Z0-9\s]/g, '');
    }

    override validate(): void {
        this.data = this.removeSpecialCharacters(this.data);
    }
}
