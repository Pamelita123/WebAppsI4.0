import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { login } from '../../services/auth/auth.service';
import { saveTokenToLocalStorage } from '@expressControllers/auth/auth.controller';
import { MainCardComponent } from '@app/layout/cards/mainCard.component';
import { InputComponent } from '@app/layout/inputs/input.component';
import { ButtonComponent } from '@app/layout/buttons/button.component';

@Component({
  selector: 'login-view',
  templateUrl: './login.view.html',
  imports: [
    FormsModule,
    MainCardComponent,
    InputComponent,
    ButtonComponent
  ],
  standalone: true
})
export class LoginView {
  formData = {
    email: '',
    password: ''
  };

  async loginHandler() {
    try {
      const result = await login({
        email: this.formData.email,
        password: this.formData.password
      });

      if (result instanceof Error) {
        alert(result.message || 'Login failed!');
        return;
      }
      const loginResponse = result as any;
      if (loginResponse && loginResponse.token) {
        saveTokenToLocalStorage(loginResponse.token);
        alert('Login successful!');
        window.location.href = '/';
      } else {
        alert('Login failed: Token not received.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during login.';
      alert(`Login failed: ${errorMessage}`);
    }
  }
}