import { Routes } from '@angular/router';
import { LoginView } from '@app/views/login/login.view';
import { RegisterView } from '@app/views/register/register.view';
import { HomeView } from '@app/views/home/home.view';

export const appRoutes: Routes = [
  { path: '', component: HomeView },
  { path: 'login', component: LoginView },
  { path: 'register', component: RegisterView },
  { path: '**', component: HomeView } // <-- cualquier otra ruta muestra Home
];


