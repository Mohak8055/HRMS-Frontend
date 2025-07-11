import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients, EmployeeDetails } from '../modal/client';
import {
  IEmployeeList,
  IEmployeeResponse,
  ISaveEmployee,
} from '../modal/employee';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  http = inject(HttpClient);
  apiUrl = 'https://freeapi.miniprojectideas.com/api/EmployeeApp';

  getAllClients(): Observable<{ data: IEmployeeList[] }> {
    return this.http.get<{ data: IEmployeeList[] }>(
      this.apiUrl + '/GetAllEmployee'
    );
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/GetEmployeeByEmployeeId?id=${id}`
    );
  }

  saveEmployee(employee: EmployeeDetails): Observable<IEmployeeResponse> {
    return this.http.post<IEmployeeResponse>(
      `${this.apiUrl}/CreateNewEmployee`,
      employee
    );
  }

  updateEmployee(employee: EmployeeDetails): Observable<IEmployeeResponse> {
    return this.http.put<IEmployeeResponse>(
      `${this.apiUrl}/UpdateEmployee`,
      employee
    );
  }

  deleteEmployee(id: number): Observable<IEmployeeResponse> {
    return this.http.delete<IEmployeeResponse>(
      `${this.apiUrl}/DeleteEmployeeByEmpId?empId=${id}`
    );
  }

  getAllRoles(): Observable<{ data: [] }> {
    return this.http.get<{ data: [] }>(`${this.apiUrl}/GetAllRoles`);
  }

  getAllDesignations(): Observable<{ data: [] }> {
    return this.http.get<{ data: [] }>(`${this.apiUrl}/GetAllDesignation`);
  }
}
