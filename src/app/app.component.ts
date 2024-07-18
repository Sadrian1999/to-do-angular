import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from "./list/list.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  static id: number = 0;
  priority: number = 0;
  description: string = "";
  items: Record[] = [];

  
  addRecord(){
    const record: Record = {
      id: AppComponent.id++,
      priority: this.priority,
      description: this.description
    };
    this.items.push(record);
  }

}
export interface Record{
  id: number;
  priority: number;
  description: string;
}