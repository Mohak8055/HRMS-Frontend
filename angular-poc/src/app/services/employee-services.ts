import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDelete, IEmployeeResponse } from '../modal/employee';
import { Employee, IAllEmployees } from '../modal/client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServices {
  http = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;

  createEmployee(payload: Employee): Observable<any> {
    return this.http.post<any>(
      `${this.apiBaseUrl}${environment.endpoints.createEmployee}`,
      payload
    );
  }

  getAllEmployees(params: any): Observable<any> {
    const url = `${this.apiBaseUrl}${environment.endpoints.getAllEmployees}`;
    const queryParams = new URLSearchParams();
    if (params.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params.pageSize) {
      queryParams.append('limit', params.pageSize.toString());
    }
    if (params.search) {
      queryParams.append(params.search.key, params.search.value.toString());
    }
    return this.http.get<any>(url + '?' + queryParams.toString());
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiBaseUrl}${environment.endpoints.user}/${id}`
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<any>(
      `${this.apiBaseUrl}${environment.endpoints.updateEmployee}`,
      employee
    );
  }

  resetPassword(payload: any): Observable<any> {
    return this.http.patch<any>(`${this.apiBaseUrl}/user/reset-password`, payload);
  }

  deleteEmployee(payload: IDelete): Observable<any> {
    return this.http.delete<any>(
      `${this.apiBaseUrl}${environment.endpoints.user}/${payload.id}/${payload.status}`
    );
  }

  getAllRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}${environment.endpoints.getAllRoles}`);
  }

  getAllDepartements(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}${environment.endpoints.getAllDepartements}`);
  }

  sendNewEmployeeMail(emailData: { recipient_mail: string, subject: string, employee_name: string, temporary_password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/employee-mail/send-welcome-email`, emailData);
  }
}