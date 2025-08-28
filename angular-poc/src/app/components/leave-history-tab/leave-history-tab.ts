import { Component, inject, OnInit } from '@angular/core';
import { LeaveServices } from '../../services/leave/leave-services';
import { Auth } from '../../services/auth';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-history-tab',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './leave-history-tab.html',
  styleUrl: './leave-history-tab.css',
})
export class LeaveHistoryTab implements OnInit {
  leaveServices = inject(LeaveServices);
  authServices = inject(Auth);
  userDeatils = this.authServices.getUserDetails();
  leavesList: any[] = [];
  activePanelId: string | null = null;

  togglePanel(panelId: string): void {
    this.activePanelId = this.activePanelId === panelId ? null : panelId;
  }

  isPanelOpen(panelId: string): boolean {
    return this.activePanelId === panelId;
  }
  calculateNoOfDays(fromDateIso: string, toDateIso: string): number {
    const fromDate = new Date(fromDateIso);
    const toDate = new Date(toDateIso);

    // Strip time to ensure date-only comparison (in UTC)
    const fromUTC = Date.UTC(
      fromDate.getUTCFullYear(),
      fromDate.getUTCMonth(),
      fromDate.getUTCDate()
    );
    const toUTC = Date.UTC(
      toDate.getUTCFullYear(),
      toDate.getUTCMonth(),
      toDate.getUTCDate()
    );

    // Difference in milliseconds / ms per day + 1 to include both days
    const daysDiff = Math.floor((toUTC - fromUTC) / (1000 * 60 * 60 * 24)) + 1;

    return daysDiff > 0 ? daysDiff : 0;
  }

  ngOnInit(): void {
    const userId = this.userDeatils?.userId;
    //API Get Leaves by userId
    if (userId) {
      this.getLeaveById(userId);
    }
  }

  //API Get LeaveByID
  getLeaveById(id: number) {
    this.leaveServices.getAllLeavesByEmployeeId(id).subscribe({
      next: (response) => {
        this.leavesList = response;
      },
      error: (err) => {
        console.log('Something Went wrong', err);
      },
    });
  }
}