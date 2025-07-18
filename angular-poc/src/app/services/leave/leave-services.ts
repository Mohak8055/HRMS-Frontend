import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeResponse } from '../../modal/employee';
import { ILeaveCreate } from '../../modal/leave';

@Injectable({
  providedIn: 'root',
})
export class LeaveServices {
  http = inject(HttpClient);
  apibaseUrl = 'https://freeapi.miniprojectideas.com/api/EmployeeLeave';

  addLeave(payload: ILeaveCreate): Observable<IEmployeeResponse> {
    return this.http.post<IEmployeeResponse>(
      `${this.apibaseUrl}/AddLeave`,
      payload
    );
  }

  getAllLeaves(): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(`${this.apibaseUrl}/GetAllLeaves`);
  }

  getAllLeavesByEmployeeId(id: number): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(
      `${this.apibaseUrl}/GetAllLeavesByEmployeeId?id=${id}`
    );
  }

  approveLeaveById(id: number): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(
      `${this.apibaseUrl}/ApproveLeave?id=${id}`
    );
  }

  rejectLeaveById(id: number): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(
      `${this.apibaseUrl}/RejectLeave?id=${id}`
    );
  }
}
