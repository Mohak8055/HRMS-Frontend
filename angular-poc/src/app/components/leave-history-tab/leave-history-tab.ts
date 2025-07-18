import { Component, inject, OnInit } from '@angular/core';
import { LeaveServices } from '../../services/leave/leave-services';
import { Auth } from '../../services/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-history-tab',
  imports: [DatePipe],
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

  ngOnInit(): void {
    const userId = this.userDeatils?.employeeId;
    //API Get Leaves by userId
    if (userId) {
      this.getLeaveById(userId);
    }
  }

  //API Get LeaveByID
  getLeaveById(id: number) {
    this.leaveServices.getAllLeavesByEmployeeId(id).subscribe({
      next: (response) => {
        if (response.result) {
          this.leavesList = response.data;
        }
      },
      error: (err) => {
        console.log('Something Went wrong', err);
      },
    });
  }
}
