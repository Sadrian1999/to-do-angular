import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Record } from '../Record';
import { RecordHandling } from '../RecordHandling';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: `
  @for (item of recordHandling.getRecords(); track item.id){
    <div class="container">
      <div class="item">ID: {{item.id}}</div>
      <div class="item">Description: {{item.description}}</div>
      <div class="item">Priority: {{item.priority}}</div>
      <button class="input-style" (click)="removeRecord(item.id)">Remove</button>
  </div>
  }@empty {
    <div>Nincs itt semmi gyászos</div>
  }
  `,
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() recordHandling: RecordHandling = inject(RecordHandling);

  removeRecord(id: number){
    this.recordHandling.removeRecord(undefined,id);
  }
}
