import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Emp } from '../services/emp';
import { IEmployee } from '../modal/employee';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  empService = inject(Emp);
  dialog = inject(MatDialog);
  employeesList: IEmployee[] = [];
  openPopup = false;
  isLoading = true;
  todayDate = this.formatDate(new Date());
  dayOfWeek: string = this.getDayOfWeek(new Date());
  currentTime: string = '';
  greeting: string = '';

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
    return `${day}${suffix} ${month}`;
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
}
