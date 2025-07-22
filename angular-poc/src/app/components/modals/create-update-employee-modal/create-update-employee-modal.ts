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
import { DatePicker } from '../../date-picker/date-picker';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-create-update-employee-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, CommonModule, DatePicker,
    MatSlideToggleModule
  ],
  templateUrl: './create-update-employee-modal.html',
  styleUrl: './create-update-employee-modal.css',
})
export class CreateUpdateEmployeeModal implements OnChanges {
  employeeService = inject(EmployeeServices);
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() submit!: (data: Employee) => void;
  @Input() formData: Employee | null = null;
  @Input() isEdit: boolean = false;
  min = new Date(1900, 0, 1);
  max = new Date(2100, 11, 31);

  roles: any[] = [];
  departements: any[] = [];

  employeeDetails: FormGroup = new FormGroup({
    // employeeId: new FormControl(0),
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
    // Update the form control manually if needed
    this.employeeDetails.get('active')?.setValue(isActive);
  }

  // ngOnInit() {
  //   this.getAllRoles();
  //   this.fetchAllDepartements();
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
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        dob: '',
        doj: '',
        departmentId: '',
        managerId: 0,
        active: true,
        // createdAt: '',
        // updatedAt: '',
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
    this.close.emit();
  }
  onSubmit() {
    if (this.employeeDetails.valid) {
      if (this.submit) {
        this.submit(this.employeeDetails.value);
        
      }
      console.log('submitted d',this.employeeDetails.value)
    } else {
      console.log(this.employeeDetails)
    }
  }
}
