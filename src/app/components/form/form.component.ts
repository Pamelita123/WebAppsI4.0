import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../layout/inputs/input.component';
import { ButtonComponent } from '../../layout/buttons/button.component';
import { MainCardComponent } from '../../layout/cards/mainCard.component'; 
import { AnimalPayLoad } from '@app/models/animals/animals.types';

@Component({
  selector: 'form-selector',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    InputComponent,
    ButtonComponent,
    MainCardComponent
  ]
})
export class FormComponent {
  @Output() addAnimal = new EventEmitter<AnimalPayLoad>();
  @Input() addAnimalFunciton: (newAnimal: AnimalPayLoad) => Promise<void> = async () => {};

formData: AnimalPayLoad = {
  name: '',
  age: 0,
  weight: 0,
  image_url: ''
};



async onSubmit() {
  if (this.formData.name && this.formData.age && this.formData.weight) {
    this.addAnimal.emit({ ...this.formData });
    await this.addAnimalFunciton(this.formData); // Espera a que termine
    this.formData = { name: '', age: 0, weight: 0, image_url: '' };
  }
}
}