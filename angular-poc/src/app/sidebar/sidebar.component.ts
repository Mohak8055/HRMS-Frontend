import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  authService = inject(Auth);
  role = this.authService.getUserRole() || '';
  menuItems = [
    //Admin
    { path: 'admin/dashboard', icon: 'bi bi-house-door-fill', label: 'Home', roles: ['Admin'] },
    { path: 'admin/employee', icon: 'bi bi-person-lines-fill', label: 'Employees', roles: ['Admin'] },
    { path: 'admin/leave', icon: 'bi bi-person-lines-fill', label: 'Leave', roles: ['Admin'] },
    { path: 'admin/broadcast', icon: 'bi bi-megaphone-fill', label: 'Broadcast', roles: ['Admin'] },
    //Employee
    { path: 'employee/dashboard', icon: 'bi bi-house-door-fill', label: 'Home', roles: ['Employee'] },
    { path: 'employee/leave', icon: 'bi bi-person-badge', label: 'Leave', roles: ['Employee'] },
  ];

  logout() {
    this.authService.logout();
  }
}