import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-card-selector',
  templateUrl: './mainCard.component.html',
  styleUrls: ['./mainCard.component.css'],
  standalone: true,
})

export class MainCardComponent {
  @Input() dimensions: { 
    width: string | undefined | null, 
    height: string | undefined | null
  } = { width: '100%', height: '100%' };
}