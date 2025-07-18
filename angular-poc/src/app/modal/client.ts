export class Clients {
  clientId: number;
  contactPersonName: string;
  companyName: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  employeeStrength: number;
  gstNo: string;
  contactNo: string;
  regNo: string;

  constructor() {
    this.clientId = 0;
    this.contactPersonName = '';
    this.companyName = '';
    this.address = '';
    this.city = '';
    this.pincode = '';
    this.state = '';
    this.employeeStrength = 0;
    this.gstNo = '';
    this.contactNo = '';
    this.regNo = '';
  }
}

export class EmployeeDetails {
  roleId?: number;
  empId?: number;
  userName?: string;
  empCode?: string;
  empName?: string;
  empEmailId?: string;
  empDesignationId?: number;
  empContactNo?: string;
  empAltContactNo?: string;
  empPersonalEmailId?: string;
  empExpTotalYear?: number;
  empExpTotalMonth?: number;
  empCity?: string;
  empState?: string;
  empPinCode?: string;
  empAddress?: string;
  empPerCity?: string;
  empPerState?: string;
  empPerPinCode?: string;
  empPerAddress?: string;
  password?: string;
  ErpEmployeeSkills?: any[] = [];
  ErmEmpExperiences?: any[] = [];

  constructor() {
    this.roleId = 0;
    this.empId = 0 || undefined;
    this.userName = '';
    this.empCode = '';
    this.empName = '';
    this.empEmailId = '';
    this.empDesignationId = 0;
    this.empContactNo = '';
    this.empAltContactNo = '';
    this.empPersonalEmailId = '';
    this.empExpTotalYear = 0;
    this.empExpTotalMonth = 0;
    this.empCity = '';
    this.empState = '';
    this.empPinCode = '';
    this.empAddress = '';
    this.empPerCity = '';
    this.empPerState = '';
    this.empPerPinCode = '';
    this.empPerAddress = '';
    this.password = '';
    this.ErpEmployeeSkills = [];
    this.ErmEmpExperiences = [];
  }
}

export class IAllEmployees {
  employeeId: number | undefined;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;

  constructor() {
    this.employeeId = 0;
    this.employeeName = '';
    this.deptId = 0;
    this.deptName = '';
    this.contactNo = '';
    this.emailId = '';
    this.role = '';
  }
}

export class Employee {
  employeeId: number | undefined = 0;
  employeeName: string = '';
  deptId: number = 0;
  contactNo: string = '';
  emailId: string = '';
  role: string = '';
  gender: string = '';
  password: string = ''
}

