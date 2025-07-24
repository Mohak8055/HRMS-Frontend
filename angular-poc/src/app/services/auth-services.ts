import { HttpClient } from '@angular/common/http';
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

  login(payload: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.baseUrl}${environment.endpoints.login}`, payload);
  }
}
