import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from './auth-services';
import { Observable } from 'rxjs';

interface User {
  username: string;
  password: string;
  role: 'admin' | 'Employee';
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private staticUsers: User[] = [
    { username: 'admin@example.com', password: 'admin123', role: 'admin' },
    {
      username: 'employee@example.com',
      password: 'employee123',
      role: 'Employee',
    },
  ];
  private tokenKey = 'authData';
  private loggedIn = false;
  router = inject(Router);
  authServices = inject(AuthServices);

  constructor() {
    // Initialize from localStorage
    const stored = localStorage.getItem('loggedIn');
    this.loggedIn = stored === 'true';
  }

  // login() {
  //   this.loggedIn = true;
  //   localStorage.setItem('loggedIn', 'true');
  //   this.router.navigateByUrl('/home');
  // }

  login(data: any): Observable<boolean> {
    const payload = {
      email: data.username,
      password: data.password,
    };
    return new Observable<boolean>((observer) => {
    this.authServices.login(payload).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem('authData', JSON.stringify(response));
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      },
      error: (err) => {
        console.error('Login failed', err);
        observer.next(false);
        observer.complete();
      }
    });
  });
  }

  // login(username: string, password: string): boolean {
  //   console.log(username, password)
  //   const user = this.staticUsers.find(
  //     (u) => u.username === username && u.password === password
  //   );
  //   console.log(user)
  //   if (user) {
  //     const tokenPayload =
  //       JSON.stringify({ username: user.username, role: user.role })

  //     localStorage.setItem(this.tokenKey, tokenPayload);
  //     console.log(tokenPayload)
  //     return true;
  //   }
  //   return false;
  // }

  // logout() {
  //   this.loggedIn = false;
  //   localStorage.setItem('loggedIn', 'false');
  //   this.router.navigateByUrl('/login');
  // }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login');
  }

  // isAuthenticated(): boolean {
  //   return this.loggedIn;
  // }
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;
    try {
      const parsed = JSON.parse(token);
      return parsed.roles[0].name;
    } catch {
      return null;
    }
  }

  getUserDetails(): {} | any {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;
    try {
      const parsed = JSON.parse(token);
      return parsed;
    } catch {
      return null;
    }
  }
}
