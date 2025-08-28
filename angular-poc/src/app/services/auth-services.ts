import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRequest, IUserResponse } from '../modal/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  login(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // The backend with OAuth2PasswordRequestForm expects 'username' and 'password' fields.
    const body = new HttpParams()
      .set('username', payload.username)
      .set('password', payload.password);

    return this.http.post<any>(`${this.baseUrl}${environment.endpoints.login}`, body.toString(), { headers });
  }
}