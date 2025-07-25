// src/app/interceptors/auth.interceptor.ts
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isTokenExpired } from '../utils/token-utils';
import { SessionTimeoutDialogComponent } from '../components/modals/session-timeout/session-timeout-dialog.component';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(Auth);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  const userDetails = auth.getUserDetails();
  const token = userDetails?.access_token;

  let modifiedReq = req;
  if (token) {
    // Check token expiry
    if (isTokenExpired(token)) {
      // Show session timeout dialog
      dialog.open(SessionTimeoutDialogComponent, {
        width: '400px',
        disableClose: true,
      });
      auth.logout(); // clear storage/session etc.
      router.navigate(['/login']);
      return next(req); // or throw an error
    }

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // Token expired or unauthorized
        alert('Session expired. Please Login again.');
        auth.logout(); // custom method to clear local/session storage
        router.navigate(['/login']); // redirect to login
      }

      return throwError(() => error);
    })
  );
};
