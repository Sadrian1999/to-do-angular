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

  static id: number = 1;
  priority: number = 0;
  description: string = "";
  errorMessage: string ="";

  items: Record[] = this.recordHandling.getRecords();
  descriptionValidator: DescriptionValidator = new DescriptionValidator(this.description);
  priorityValidator: PriorityValidator = new PriorityValidator(this.priority);


  addRecord(){
    this.descriptionValidator = new DescriptionValidator(this.description);
    this.priorityValidator= new PriorityValidator(this.priority); 
    this.descriptionValidator.validate();
    try{
      this.priorityValidator.validate();
    }
    catch (error){
      if(error instanceof Error) this.errorMessage = error.message;
      return;
    }
    const record: Record = {id: AppComponent.id++, description: this.descriptionValidator.getData(), priority: this.priorityValidator.getData()};
    this.recordHandling.addRecord(record);
    this.description = "";
    this.priority = 0;
  }
}