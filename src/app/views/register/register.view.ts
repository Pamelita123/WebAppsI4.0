import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Asegúrate de tener esto
import { register } from '@services/auth/auth.service';
import { MainCardComponent } from '@app/layout/cards/mainCard.component';
import { InputComponent } from '@app/layout/inputs/input.component';
import { ButtonComponent } from '@app/layout/buttons/button.component';

@Component({
  selector: 'register-view',
  templateUrl: './register.view.html',
  imports: [
    FormsModule,           // <-- Y esto en el array
    MainCardComponent,
    InputComponent,
    ButtonComponent
  ],
  standalone: true
})
export class RegisterView {
  formData = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };

  async registerHandler() {
    try {
      const result = await register(this.formData);
      if (result instanceof Error) {
        alert(result.message || 'Registration failed!');
        return;
      } else {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado durante el registro.';
      alert(`Registration failed: ${errorMessage}`);
    }
  }
}