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
  leaveId?: number
  employeeId: number
  fromDate: string
  toDate: string
  noOfDays: number
  leaveType: string
  details: string
  isApproved?: boolean
  approvedDate?: string
}

