import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  error = '';
  loginObj: any = {
    email: '',
    password: '',
  };
  router = inject(Router);
  authService = inject(Auth);

  login() {
    const success = this.authService.login(this.username, this.password);
    console.log('success', success)
    if (success) {
      const role = this.authService.getUserRole();
      if (role === 'Admin Department Employee') this.router.navigate(['/admin']);
      else if (role === 'Employee') this.router.navigate(['/employee']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
