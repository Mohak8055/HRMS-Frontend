import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IEmployeeList } from '../../../modal/employee';
import { ClientService } from '../../../services/client-service';
import { EmployeeDetails, IAllEmployees } from '../../../modal/client';
import { EmployeeServices } from '../../../services/employee-services';

@Component({
  selector: 'app-edit-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css',
})
export class EditModal implements OnChanges, OnInit {
  @Input() employee: IAllEmployees | null = null;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<IAllEmployees>();
  roles: any[] = [];
  departements: any[] = [];

  employeeService = inject(EmployeeServices);

  formEmployee: IAllEmployees = {
    employeeId: 0,
    employeeName: '',
    deptId: 0,
    deptName: '',
    contactNo: '',
    emailId: '',
    role: '',
  };

  ngOnInit() {
    this.getAllRoles();
    this.getAllDesignation();
  }

  ngOnChanges() {
    if (this.employee) {
      this.formEmployee = { ...this.employee };
    } else {
      this.formEmployee = {
        employeeId: 0,
        employeeName: '',
        deptId: 0,
        deptName: '',
        contactNo: '',
        emailId: '',
        role: '',
      };
    }
  }

  getAllRoles() {
    this.employeeService.getAllRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllDesignation() {
    this.employeeService.getAllDepartements().subscribe({
      next: (res) => {
        this.departements = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  save() {
    this.submit.emit(this.formEmployee);
  }
  closeModal() {
    this.close.emit();
  }
}
