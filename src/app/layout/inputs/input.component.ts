import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'], 
  standalone: true,
  imports: [FormsModule] 
})
export class InputComponent {
  @Input() inputId: string = '';
  @Input() inputValue: string | undefined | null | number = ''; 
  @Input() type: string = 'text'; // <-- AGREGA ESTA LÍNEA
  @Output() inputValueChange = new EventEmitter<string | number>();

  onValueChange(newValue: string): void {
    this.inputValue = newValue;
    this.inputValueChange.emit(this.inputValue);
  }
}