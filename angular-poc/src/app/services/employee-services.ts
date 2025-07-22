import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDelete, IEmployeeResponse } from '../modal/employee';
import { Employee, IAllEmployees } from '../modal/client';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServices {
  http = inject(HttpClient);
  apibaseUrl = 'https://freeapi.miniprojectideas.com/api/EmployeeLeave';

  // createEmployee(payload: IAllEmployees): Observable<IEmployeeResponse> {
  //   return this.http.post<IEmployeeResponse>(
  //     `${this.apibaseUrl}/CreateEmployee`,
  //     payload
  //   );
  // }
  createEmployee(payload: Employee): Observable<any> {
    return this.http.post<any>(
      `http://192.168.10.70:8070/user/create`,
      payload
    );
  }

  // getAllEmployees(): Observable<IEmployeeResponse> {
  //   return this.http.get<IEmployeeResponse>(this.apibaseUrl + '/GetEmployees');
  // }
  getAllEmployees(): Observable<any> {
    return this.http.get<any>('http://192.168.10.70:8070/user/all-user');
  }

  // getEmployeeById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apibaseUrl}/GetEmployeeById?id=${id}`);
  // }
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`http://192.168.10.70:8070/user/${id}`);
  }

  // updateEmployee(employee: IAllEmployees): Observable<IEmployeeResponse> {
  //   return this.http.put<IEmployeeResponse>(
  //     `${this.apibaseUrl}/UpdateEmployee`,
  //     employee
  //   );
  // }
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<any>(
      `http://192.168.10.70:8070/user/update`,
      employee
    );
  }

  // deleteEmployee(id: number): Observable<IEmployeeResponse> {
  //   return this.http.delete<IEmployeeResponse>(
  //     `${this.apibaseUrl}/DeleteEmployee?id=${id}`
  //   );
  // }
  deleteEmployee(payload: IDelete): Observable<any> {
    return this.http.delete<any>(
      `http://192.168.10.70:8070/user/${payload.id}/${payload.status}`
    );
  }

  // getAllRoles(): Observable<IEmployeeResponse> {
  //   return this.http.get<IEmployeeResponse>(`${this.apibaseUrl}/GetAllRoles`);
  // }
  getAllRoles(): Observable<any> {
    return this.http.get<any>(`http://192.168.10.70:8070/master/roles`);
  }

  // getAllDepartements(): Observable<IEmployeeResponse> {
  //   return this.http.get<IEmployeeResponse>(
  //     `${this.apibaseUrl}/GetDepartments`
  //   );
  // }
  getAllDepartements(): Observable<any> {
    return this.http.get<any>(
      `http://192.168.10.70:8070/master/depts`
    );
  }
}
