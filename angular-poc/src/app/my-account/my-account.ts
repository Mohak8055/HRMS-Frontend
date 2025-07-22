import { Component, inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Breadcrum } from '../components/breadcrum/breadcrum';

@Component({
  selector: 'app-my-account',
  imports: [],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css'
})
export class MyAccount {
authService = inject(Auth);
userDetails: any = '';

ngOnInit() {
  this.getUserDetails();
}
getUserDetails() {
  this.userDetails = this.authService.getUserDetails();
}
}
