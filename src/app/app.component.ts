import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from "./list/list.component";
import { FormsModule } from '@angular/forms';
import { RecordHandling } from './RecordHandling';
import { Record } from './Record';
import { DescriptionValidator } from './DescriptionValidator';
import { PriorityValidator } from './PriorityValidator';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  recordHandling = inject(RecordHandling);
  items: Record[] = this.recordHandling.getRecords();

  static id: number = 1;
  priority: number = 0;
  description: string = "";

  errorMessage: string = "";
  isHidden: boolean = true;

  descriptionValidator: DescriptionValidator = new DescriptionValidator(this.description);
  priorityValidator: PriorityValidator = new PriorityValidator(this.priority);

  addRecord(){
    this.isHidden = true;
    this.updateValidators();
    this.descriptionValidator.validate();
    try{
      this.priorityValidator.validate();
    }
    catch (error){
      if(error instanceof Error){
        this.errorMessage = error.message;
        this.isHidden = false;
        return;
      }
    }
    const record: Record = {id: AppComponent.id++, description: this.descriptionValidator.getData(), priority: this.priorityValidator.getData()};
    this.recordHandling.addRecord(record);
    this.resetFields();
  }
  updateValidators(){
    this.descriptionValidator = new DescriptionValidator(this.description);
    this.priorityValidator= new PriorityValidator(this.priority);  
  }
  resetFields(){
    this.description = "";
    this.priority = 0;
  }
}