import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeResponse } from '../modal/employee';
import { Employee, IAllEmployees } from '../modal/client';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServices {
  http = inject(HttpClient);
  apibaseUrl = 'https://freeapi.miniprojectideas.com/api/EmployeeLeave';

  createEmployee(payload: IAllEmployees): Observable<IEmployeeResponse> {
    return this.http.post<IEmployeeResponse>(
      `${this.apibaseUrl}/CreateEmployee`,
      payload
    );
  }

  getAllEmployees(): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(this.apibaseUrl + '/GetEmployees');
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apibaseUrl}/GetEmployeeById?id=${id}`
    );
  }

  updateEmployee(employee: IAllEmployees): Observable<IEmployeeResponse> {
    return this.http.put<IEmployeeResponse>(
      `${this.apibaseUrl}/UpdateEmployee`,
      employee
    );
  }

  deleteEmployee(id: number): Observable<IEmployeeResponse> {
    return this.http.delete<IEmployeeResponse>(
      `${this.apibaseUrl}/DeleteEmployee?id=${id}`
    );
  }

  getAllRoles(): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(`${this.apibaseUrl}/GetAllRoles`);
  }

  getAllDepartements(): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(`${this.apibaseUrl}/GetDepartments`);
  }
}
