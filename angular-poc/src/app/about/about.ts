import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../components/client/client';

@Component({
  selector: 'app-about',
  imports: [Client],
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  router = inject(Router);

  goToHome() {
    this.router.navigateByUrl('/home');
  }
}
