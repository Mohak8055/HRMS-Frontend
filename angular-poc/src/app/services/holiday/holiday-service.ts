import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Holiday } from '../../modal/holiday';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  http = inject(HttpClient);

  getCorporateHolidays(year: number, countryCode: string) {
    const path = `holidays/${year}-${countryCode}.json`;
    return this.http.get<Holiday[]>(path);
  }
}
