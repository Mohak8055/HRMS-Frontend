import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LeaveServices } from '../../services/leave/leave-services';
import { Auth } from '../../services/auth';
import { DatePipe } from '@angular/common';
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal";
import { ToastServices } from '../../services/toast/toast-services';

@Component({
  selector: 'app-leave-request-tab',
  imports: [DatePipe, ConfirmationModal],
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
    //API Get All Leaves
    this.fetchAllLeaves();
  }

  //API Get all leaves req
  fetchAllLeaves() {
    this.leaveServices.getAllLeaves().subscribe({
      next: (res) => {
        if (res.result) {
          this.allLeaveRequests = res.data;
        }
      },
      error: (err) => {
        console.log('Something went wrong', err);
      },
    });
  }

  //API Approve Leave
  handleApproveLeave(id: number) {
    this.leaveServices.approveLeaveById(id).subscribe({
      next: (res) => {
        if (res.result) {
          this.toast.success(res.message || 'Leave request approved');
          this.fetchAllLeaves();
        } else {
          this.toast.warning(res.message || 'Something went wrong');
        }
      },
      error: (err) => {
        this.toast.error(err.message || 'Something went wrong');
        console.log('Something went wrong', err);
      }
    })
  }

  //API Approve Leave
  handleRejectLeave(id: number) {
    this.leaveServices.rejectLeaveById(id).subscribe({
      next: (res) => {
        if (res.result) {
          this.toast.success(res.message || 'Leave request rejected');
          this.fetchAllLeaves();
        } else {
          this.toast.warning(res.message || 'Something went wrong');
        }
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
