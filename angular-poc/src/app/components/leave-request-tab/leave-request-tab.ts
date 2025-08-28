import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LeaveServices } from '../../services/leave/leave-services';
import { Auth } from '../../services/auth';
import { DatePipe, CommonModule } from '@angular/common';
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal";
import { ToastServices } from '../../services/toast/toast-services';

@Component({
  selector: 'app-leave-request-tab',
  standalone: true,
  imports: [DatePipe, ConfirmationModal, CommonModule],
  templateUrl: './leave-request-tab.html',
  styleUrl: './leave-request-tab.css',
})
export class LeaveRequestTab implements OnInit {
  @ViewChild('confirmModal') confirmModal!: ConfirmationModal;

  leaveServices = inject(LeaveServices);
  authServices = inject(Auth);
  toast = inject(ToastServices);
  allLeaveRequests: any[] = [];
  activePanelId: string | null = null;
  selectedLeaveId: number | 0 = 0;
  leaveStatus: string | '' = '';
  confirmationMessage: string | '' = '';

  ngOnInit(): void {
    this.fetchAllLeaves();
  }
  calculateNoOfDays(fromDateIso: string, toDateIso: string): number {
    const fromDate = new Date(fromDateIso);
    const toDate = new Date(toDateIso);

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

    const daysDiff = Math.floor((toUTC - fromUTC) / (1000 * 60 * 60 * 24)) + 1;

    return daysDiff > 0 ? daysDiff : 0;
  }

  fetchAllLeaves() {
    this.leaveServices.getAllLeaves().subscribe({
      next: (res) => {
        this.allLeaveRequests = res;
      },
      error: (err) => {
        console.log('Something went wrong', err);
      },
    });
  }

  handleApproveLeave(id: number) {
    this.leaveServices.approveLeaveById(id).subscribe({
      next: (res) => {
        this.toast.success('Leave request approved');
        this.fetchAllLeaves();
      },
      error: (err) => {
        this.toast.error(err.message || 'Something went wrong');
        console.log('Something went wrong', err);
      }
    })
  }

  handleRejectLeave(id: number) {
    this.leaveServices.rejectLeaveById(id).subscribe({
      next: (res) => {
          this.toast.success('Leave request rejected');
          this.fetchAllLeaves();
      },
      error: (err) => {
        this.toast.error(err.message || 'Something went wrong');
        console.log('Something went wrong', err);
      }
    })
  }

  togglePanel(panelId: string): void {
    this.activePanelId = this.activePanelId === panelId ? null : panelId;
  }

  isPanelOpen(panelId: string): boolean {
    return this.activePanelId === panelId;
  }

  handleApprove(id: number) {
    this.confirmationMessage = 'Are you sure you want to approve this leave request?';
    this.confirmModal.open();
    this.selectedLeaveId = id;
    this.leaveStatus = 'approve'
  }

  handleReject(id: number): void {
    this.confirmationMessage = 'Are you sure you want to reject this leave request?';
    this.confirmModal.open();
    this.selectedLeaveId = id;
    this.leaveStatus = 'reject'
  }

  onConfirm() {
    if (this.leaveStatus === 'approve') {
      this.handleApproveLeave(this.selectedLeaveId);
    } else {
      this.handleRejectLeave(this.selectedLeaveId);
    }
  }
}