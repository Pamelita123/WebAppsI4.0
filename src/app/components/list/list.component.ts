import { Component, Input } from '@angular/core';
import { MainCardComponent } from '../../layout/cards/mainCard.component';
import { AnimalAtributes } from '@app/models/animals/animals.types';

@Component({
  selector: 'list-selector',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [
    MainCardComponent,
  ],
  standalone: true,
})
export class ListComponent {
  @Input() list: AnimalAtributes[] = []; 
}