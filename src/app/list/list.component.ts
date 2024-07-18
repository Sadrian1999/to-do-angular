import { Component, Input } from '@angular/core';
import { Record } from '../app.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: `
  @for (item of items; track item.id){
    <p>
      {{item.id}}{{item.description}}{{item.priority}}
    </p>
  }@empty {
    <p>Nincs itt semmi gyászos</p>
  }
  `,
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() items: Record[] = [];
}
