import { Component, inject, OnInit } from '@angular/core';
import { HolidayService } from '../services/holiday/holiday-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holidays',
  imports: [CommonModule],
  templateUrl: './holidays.html',
  styleUrl: './holidays.css'
})
export class Holidays implements OnInit{
holidayServices = inject(HolidayService);
holidayList: { [month: string]: any[] } = {};
readonly allMonths: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

ngOnInit() {
this.fetchAllHolidays()
}

fetchAllHolidays() {
  this.holidayServices.getCorporateHolidays(2025, 'IN').subscribe({
    next: (res) => {
      this.holidayList = this.formatHolidaysByMonth(res);
    },
    error: (err) => {
      console.error('Error fetching holidays:', err);
    }
  })
}

formatHolidaysByMonth(holidays: any[]): { [month: string]: any[] } {
  const monthMap: { [month: string]: any[] } = {};

  // Initialize all months with empty arrays
  this.allMonths.forEach(month => {
    monthMap[month] = [];
  });

  holidays.forEach((holiday) => {
    const date = new Date(holiday.date);
    const month = date.toLocaleString('default', { month: 'long' });

    if (monthMap[month]) {
      monthMap[month].push(holiday);
    }
  });

  return monthMap;
}



}
