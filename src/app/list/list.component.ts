import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: `
  @for (item of items; track item.id){
    <p>
      {{item.id}} - {{item.description}} - {{item.priority}}
    </p>
  }
  `,
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() items = "";
}
