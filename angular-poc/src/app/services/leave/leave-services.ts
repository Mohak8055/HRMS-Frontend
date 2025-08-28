import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeResponse } from '../../modal/employee';
import { ILeaveCreate, ILeaveUpdate } from '../../modal/leave';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaveServices {
  http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  sendLeaveMail(payload: any) {
    return this.http.post<any>(`${this.apiBaseUrl}${environment.endpoints.sendMail}`, payload);
  }

  addLeave(payload: ILeaveCreate): Observable<any> {
    return this.http.post<any>(
      `${this.apiBaseUrl}/leave/`,
      payload
    );
  }

  getAllLeaves(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/leave/`);
  }

  getAllLeavesByEmployeeId(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiBaseUrl}/leave/user/${id}`
    );
  }

  approveLeaveById(id: number): Observable<any> {
    const payload: ILeaveUpdate = { status: "APPROVED" };
    return this.http.patch<any>(
      `${this.apiBaseUrl}/leave/${id}`,
      payload
    );
  }

  rejectLeaveById(id: number): Observable<any> {
    const payload: ILeaveUpdate = { status: "REJECTED" };
    return this.http.patch<any>(
      `${this.apiBaseUrl}/leave/${id}`,
      payload
    );
  }
}