import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../app.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: `
  @for (item of items; track item.id){
    <div class="container">
      <div class="item">{{item.id}}</div>
      <div class="item">{{item.description}}</div>
      <div class="item">{{item.priority}}</div>
      <button (click)="removeRecord(item.id)">Remove</button>
  </div>
  }@empty {
    <div>Nincs itt semmi gyászos</div>
  }
  `,
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() items: Record[] = [];
  @Output() recordRemoved = new EventEmitter<Record[]>();

  removeRecord(id: number){
    this.items.splice(id - 1, 1);
    this.recordRemoved.emit(this.items);
  }
}
