import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from "./list/list.component";
import { FormsModule } from '@angular/forms';
import { RecordHandling } from './RecordHandling';
import { Record } from './Record';

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
  items: Record[] = this.recordHandling.getRecords();

  addRecord(){
    const record: Record = {id: AppComponent.id++, description: this.description, priority: this.priority};
    this.recordHandling.addRecord(record);
  }
}