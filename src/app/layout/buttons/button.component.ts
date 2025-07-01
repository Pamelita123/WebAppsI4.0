import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-selector',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: string = 'button'; // <-- AGREGA ESTA LÍNEA
  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}