import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeServices } from '../../../services/employee-services';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ToastServices } from '../../../services/toast/toast-services';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../modal/client';
import { DatePicker } from '../../date-picker/date-picker';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-create-update-employee-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    DatePicker,
    MatSlideToggleModule
  ],
  templateUrl: './create-update-employee-modal.html',
  styleUrl: './create-update-employee-modal.css',
})
export class CreateUpdateEmployeeModal implements OnChanges {
  employeeService = inject(EmployeeServices);
  toast = inject(ToastServices);

  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() submit!: (data: Employee) => void;
  @Input() formData: Employee | null = null;
  @Input() isEdit: boolean = false;
  @Output() employeeCreated = new EventEmitter<void>();

  min = new Date(1900, 0, 1);
  max = new Date(2100, 11, 31);

  roles: any[] = [];
  departements: any[] = [];

  employeeDetails: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required]),
    departmentId: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    roleId: new FormControl('', [Validators.required]),
    dob: new FormControl(null),
    doj: new FormControl(null),
    active: new FormControl(true),
  });

  onToggle(event: MatSlideToggleChange): void {
    const isActive = event.checked;
    console.log('Toggled:', isActive);
    this.employeeDetails.get('active')?.setValue(isActive);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      this.employeeDetails.patchValue({ ...this.formData });
    } else {
      this.employeeDetails.reset({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        dob: '',
        doj: '',
        departmentId: '',
        managerId: 0,
        active: true,
        password: '',
        roleId: '',
      });
    }

    if (changes['visible'] && this.visible) {
      this.getAllRoles();
      this.fetchAllDepartements();
    }
  }

  getAllRoles() {
    this.employeeService.getAllRoles().subscribe({
      next: (res) => {
        this.roles = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchAllDepartements() {
    this.employeeService.getAllDepartements().subscribe({
      next: (res) => {
        this.departements = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeModal() {
    this.employeeDetails.reset({
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      dob: '',
      doj: '',
      departmentId: '',
      managerId: 0,
      active: true,
      password: '',
      roleId: '',
    });
    this.close.emit();
  }

  onSubmit() {
    if (this.employeeDetails.valid) {
      const tempPassword = Math.random().toString(36).slice(-8);

      const employeeData = {
        ...this.employeeDetails.value,
        password: tempPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('Generated temp password (use for login):', tempPassword);

      this.employeeService.createEmployee(employeeData).subscribe({
        next: (res) => {
          console.log('Employee created successfully:', res);
          
          const emailPayload = {
            recipient_mail: this.employeeDetails.value.email,
            subject: 'Welcome to the Team! Your Login Credentials',
            employee_name: `${this.employeeDetails.value.firstName} ${this.employeeDetails.value.lastName}`,
            temporary_password: tempPassword,
          };

          this.employeeService.sendNewEmployeeMail(emailPayload).subscribe({
            next: (mailRes: any) => {
              console.log('Email sent successfully:', mailRes);
              this.toast.success('Employee created and welcome email sent successfully!');
              this.employeeCreated.emit();
              this.closeModal();
            },
            error: (mailErr: any) => {
              console.error('Error sending welcome email:', mailErr);
              this.toast.error('Employee created, but failed to send welcome email.');
              this.employeeCreated.emit();
              this.closeModal();
            }
          });
        },
        error: (err) => {
          console.error('Error creating employee:', err);
          this.toast.error('Failed to create employee.');
        },
      });
    } else {
      this.employeeDetails.markAllAsTouched();
      this.toast.error('Please fill out all required fields correctly.');
    }
  }
}