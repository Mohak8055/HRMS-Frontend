import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from './auth-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private tokenKey = 'authData';
  router = inject(Router);
  authServices = inject(AuthServices);

  login(data: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.authServices.login(data).subscribe({
        next: (response) => {
          if (response && response.access_token) {
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

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login');
  }

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

  getUserDetails(): any {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return null;
    try {
      return JSON.parse(token);
    } catch {
      return null;
    }
  }

  setUserDetails(userDetails: any): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(userDetails));
  }
}