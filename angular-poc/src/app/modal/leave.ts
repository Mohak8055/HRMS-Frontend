export class ILeaveByIdObject {
  details: string;
  employeeId: number;
  employeeName: string;
  fromDate: string;
  leaveId: number;
  leaveType: string;
  noOfDays: number;
  toDate: string;
  approvedDate?: any;
  isApproved?: any;

  constructor() {
    this.details = '';
    this.employeeId = 0;
    this.employeeName = '';
    this.fromDate = '';
    this.leaveId = 0;
    this.leaveType = '';
    this.noOfDays = 0;
    this.toDate = '';
    this.approvedDate = '';
    this.isApproved = '';
  }
}

export interface ILeaveCreate {
  leave_type: string
  user_id: number
  start_date: string
  end_date: string
  reason: string
}

export interface ILeaveUpdate {
    status: string;
}