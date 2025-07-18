import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { authGuard } from './guards/auth-guard';
import { Login } from './login/login';
import { LayoutComponent } from './layout/layout.component';
import { Dashboard } from './admin/dashboard/dashboard';
import { EmployeeDashboard } from './employee/employee-dashboard/employee-dashboard';
import { Employees } from './admin/employees/employees';
import { Leave } from './components/leave/leave';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard(['Admin Department Employee', 'Employee'])],
    children: [
      {
        path: 'admin',
        canActivate: [authGuard(['Admin Department Employee'])],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
          { path: 'dashboard', component: Dashboard },
          { path: 'employee', component: Employees},
          { path: 'leave', component: Leave},
        ]
      },
      {
        path: 'employee',
        canActivate: [authGuard(['Employee'])],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
          { path: 'dashboard', component: Dashboard },
          { path: 'leave', component: Leave}
        ]
      },
      // Add any shared routes here if needed
    ]
  },
  { path: '**', redirectTo: 'login' },
];
