import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from './auth-services';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private tokenKey = 'authData';
  private userDetails$$ = new BehaviorSubject<any>(this.getUserDetailsFromStorage());
  public userDetails$ = this.userDetails$$.asObservable();
  router = inject(Router);
  authServices = inject(AuthServices);

  login(data: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.authServices.login(data).subscribe({
        next: (response) => {
          if (response && response.access_token) {
            localStorage.setItem(this.tokenKey, JSON.stringify(response));
            this.userDetails$$.next(response);
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
    this.userDetails$$.next(null);
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    const userDetails = this.userDetails$$.getValue();
    return userDetails?.roles?.[0]?.name || null;
  }

  getUserDetails(): any {
    return this.userDetails$$.getValue();
  }

  private getUserDetailsFromStorage(): any {
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
    this.userDetails$$.next(userDetails);
  }
}