import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Emp {
  http = inject(HttpClient);
  apiUrl = 'https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllEmployee';

  getAllEmployees(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
