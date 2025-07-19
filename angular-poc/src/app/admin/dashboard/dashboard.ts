import { Component, inject, signal } from '@angular/core';
import { IEmployee } from '../../modal/employee';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Emp } from '../../services/emp';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../../employee-dialog/employee-dialog.component';
import { CustomTable, TableColumn } from "../../components/custom-table/custom-table";
import { HolidayService } from '../../services/holiday/holiday-service';
import { Holiday } from '../../modal/holiday';
import { ViewSwipes } from "../../components/modals/view-swipes/view-swipes";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, ViewSwipes, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  empService = inject(Emp);
  dialog = inject(MatDialog);
  holidayService = inject(HolidayService);
  showViewSwipes = signal(false);

  employeesList: IEmployee[] = [];
  openPopup = false;
  isLoading = true;
  todayDate = this.formatDate(new Date());
  dayOfWeek: string = this.getDayOfWeek(new Date());
  currentTime: string = '';
  greeting: string = '';
  imagePath: string = 'assets/images/CheckList.jpg';
  holidayList: any[] = [];

  getGreeting(date: Date): string {
    const hour = date.getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-GB', { hour12: false });
    this.greeting = this.getGreeting(now);
  }

  getDayOfWeek(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const suffix = this.getDaySuffix(day);
    const year = date.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
  }

  getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  ngOnInit(): void {
    this.updateTime();
    this.fetchHolidays();
    setInterval(() => this.updateTime(), 1000);
    this.empService.getAllEmployees().subscribe({
      next: (res) => {
        this.employeesList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchHolidays() {
    this.holidayService.getCorporateHolidays(2025, 'IN').subscribe({
      next: (res) => {
        this.holidayList = res
          .map((holiday) => {
            const dateObj = new Date(holiday.date);
            // Format to "26 January"
            const formattedDate = dateObj.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
            });
            // Get day of the week: "Sunday"
            const dayName = dateObj.toLocaleDateString('en-GB', {
              weekday: 'long',
            });
            return {
              ...holiday,
              dateObj,
              formattedDate,
              dayName,
            };
          })
          .filter((holiday) => holiday.dateObj >= new Date()) // only future dates
          .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime()) // sort ascending
          .slice(0, 4); // take first 4 upcoming
      },
    });
  }

  onEditEmp(id: number) {
    const employee = this.employeesList.find((e) => e.empId === id);
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: employee,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the employee in the list or call API to update
        const idx = this.employeesList.findIndex((e) => e.empId === id);
        if (idx > -1) {
          this.employeesList[idx] = result;
        }
      }
    });
  }

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', type: 'chip' },
    { key: 'createdAt', label: 'Created On', type: 'date' },
  ];

  data = [
    { id: 1, name: 'Nikhil', status: 'Approved', createdAt: new Date() },
    { id: 2, name: 'Amit', status: 'Pending', createdAt: new Date() },
    { id: 3, name: 'Amit', status: 'Pending', createdAt: new Date() },
    { id: 4, name: 'Amit', status: 'Pending', createdAt: new Date() },
    { id: 5, name: 'Amit', status: 'Pending', createdAt: new Date() },
    { id: 6, name: 'Amit', status: 'Pending', createdAt: new Date() },
    { id: 7, name: 'Amit', status: 'Pending', createdAt: new Date() },
  ];

  actions = [
    { label: 'Edit', icon: 'edit', color: 'primary', action: 'edit' },
    { label: 'Delete', icon: 'delete', color: 'warn', action: 'delete' },
  ];

  onRowClick(row: any) {
    console.log('Row Clicked:', row);
  }

  onActionClick(event: { row: any; action: string }) {
    const { row, action } = event;
    if (action === 'edit') {
      console.log('Edit:', row);
    } else if (action === 'delete') {
      console.log('Delete:', row);
    }
  }
  onViewSwipesClick() {
    this.showViewSwipes.set(true);
  }
  closeViewSwipes() {
    this.showViewSwipes.set(false);
  }
}
