import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRequest, IUserResponse } from '../modal/user';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  http = inject(HttpClient);
  apiBaseUrl = 'https://freeapi.miniprojectideas.com/api/EmployeeLeave';

  // login(payload: IUserRequest): Observable<IUserResponse> {
  //   return this.http.post<IUserResponse>(this.apiBaseUrl + '/Login', payload);
  // }
  login(payload: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>('http://192.168.10.70:8070/auth/login', payload);
  }
}
