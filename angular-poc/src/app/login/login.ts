import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  authService = inject(Auth);
  hidePassword: boolean = true;
  error = '';
  loginDetails: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    console.log(this.loginDetails.value);
    if (this.loginDetails.valid) {
      this.login();
    }
  }
  
  login(): void {
    this.authService
      .login(this.loginDetails.value)
      .subscribe((success: boolean) => {
        console.log('Login result:', success);
        if (success) {
          const role = this.authService.getUserRole();
          console.log(role === 'Admin','role')
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'Employee') {
            this.router.navigate(['/employee']);
          }
          this.error = '';
        } else {
          this.error = 'Invalid credentials';
        }
      });
  }
}
