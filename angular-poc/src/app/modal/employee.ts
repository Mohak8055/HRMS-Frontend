import { EmployeeDetails } from "./client";

export interface IEmployee {
  empName: string;
  empId: number;
  empCode: string;
  empEmailId: string;
  empDesignation: string;
  role: string;
  mobile: string;
}

export interface IEmployeeList {
  empName: string
  empId: number
  empCode: string
  empEmailId: string
  empDesignation: string
  mobile: string
  role: string
}

export interface IEmployeeResponse {
  message: string;
  result: boolean;
  data: EmployeeDetails[];
}

export interface ErpEmployeeSkill {
  empSkillId: number
  empId: number
  skill: string
  totalYearExp: number
  lastVersionUsed: string
}

export interface ErmEmpExperience {
  empExpId: number
  empId: number
  companyName: string
  startDate: string
  endDate: string
  designation: string
  projectsWorkedOn: string
}

export interface ISaveEmployee {
  roleId: number
  userName: string
  empCode: string
  empName: string
  empEmailId: string
  empDesignationId: number
  empContactNo: string
  empAltContactNo: string
  empPersonalEmailId: string
  empExpTotalYear: number
  empExpTotalMonth: number
  empCity: string
  empState: string
  empPinCode: string
  empAddress: string
  empPerCity: string
  empPerState: string
  empPerPinCode: string
  empPerAddress: string
  password: string
  ErpEmployeeSkills: ErpEmployeeSkill[]
  ErmEmpExperiences: ErmEmpExperience[]
}

export interface IDelete {
  id: number,
  status: boolean
}

export interface DeptOptions {
  label: string;
  value: string;
}