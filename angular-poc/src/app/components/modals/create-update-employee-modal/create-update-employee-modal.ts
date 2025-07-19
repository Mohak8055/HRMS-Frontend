import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeServices } from '../../../services/employee-services';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Employee, IAllEmployees } from '../../../modal/client';

@Component({
  selector: 'app-create-update-employee-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, CommonModule],
  templateUrl: './create-update-employee-modal.html',
  styleUrl: './create-update-employee-modal.css',
})
export class CreateUpdateEmployeeModal implements OnChanges {
  employeeService = inject(EmployeeServices);
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() submit!: (data: Employee) => void;
  @Input() formData: IAllEmployees | null = null;
  @Input() isEdit: boolean = false;

  roles: any[] = [];
  departements: any[] = [];

  employeeDetails: FormGroup = new FormGroup({
    employeeId: new FormControl(0),
    employeeName: new FormControl('', [Validators.required]),
    deptId: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
  });

  // ngOnInit() {
  //   this.getAllRoles();
  //   this.getAllDesignation();
  //   console.log('form valuesss',this.formData)
  //   if (this.formData) {
  //     console.log('form valuesss',this.formData)
  //     // Populate form with edit values
  //     this.employeeDetails.patchValue({
  //       ...this.formData,
  //     });
  //   }
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      this.employeeDetails.patchValue({ ...this.formData });
    } else {
      this.employeeDetails.reset({
        employeeId: 0,
        employeeName: '',
        deptId: '',
        contactNo: '',
        emailId: '',
        role: '',
      });
    }

    if (changes['visible'] && this.visible) {
      this.getAllRoles();
      this.getAllDesignation();
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

  closeModal() {
    this.close.emit();
  }
  onSubmit() {
    if (this.employeeDetails.valid) {
      if (this.submit) {
        this.submit(this.employeeDetails.value);
      }
    }
  }
}
