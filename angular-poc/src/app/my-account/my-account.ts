import { Component, inject } from '@angular/core';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EmployeeServices } from '../services/employee-services';
import { ToastServices } from '../services/toast/toast-services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount {
  authService = inject(Auth);
  employeeServices = inject(EmployeeServices);
  toast = inject(ToastServices);
  http = inject(HttpClient);

  userDetails: any = {};
  selectedFile: File | null = null;
  showPasswordReset = false;

  private baseUrl = 'http://127.0.0.1:8000';

  userDetailsForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  passwordForm: FormGroup = new FormGroup({
    old_password: new FormControl('', Validators.required),
    new_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.getUserDetails();
  }

  togglePasswordReset() {
    this.showPasswordReset = !this.showPasswordReset;
  }

  getUserDetails() {
    this.userDetails = this.authService.getUserDetails();
    if (this.userDetails) {
      this.userDetailsForm.patchValue({
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        phone: this.userDetails.phone,
        email: this.userDetails.email,
      });

      this.http
        .get<any>(`${this.baseUrl}/userprofile/get-profile-photo/${this.userDetails.userId}`)
        .subscribe({
          next: (res) => {
            if (res?.file_url) {
              this.userDetails.profileImageUrl = this.baseUrl + res.file_url + `?t=${new Date().getTime()}`;
              this.authService.setUserDetails(this.userDetails);
            }
          },
          error: () => {
            console.warn('No profile photo found, showing default avatar.');
            this.userDetails.profileImageUrl = '';
            this.authService.setUserDetails(this.userDetails);
          },
        });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userDetails.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private uploadOrUpdateProfileImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('user_id', this.userDetails.userId);
    formData.append('file', this.selectedFile);

    const request$ = this.http.post(`${this.baseUrl}/userprofile/upload-profile-photo`, formData);

    request$.subscribe({
      next: (res: any) => {
        this.toast.success(res?.message || 'Profile image saved successfully.');
        if (res.file_url) {
          this.userDetails.profileImageUrl = this.baseUrl + res.file_url + `?t=${new Date().getTime()}`;
          this.authService.setUserDetails(this.userDetails);
        }
      },
      error: (err) => {
        this.toast.error(err.message || 'Error uploading profile image');
        console.error('Error uploading profile image:', err);
      },
    });
  }

  onSubmit() {
    if (this.userDetailsForm.valid) {
      const updatePayload = {
        id: this.userDetails.userId,
        ...this.userDetailsForm.value,
      };

      this.employeeServices.updateEmployee(updatePayload).subscribe({
        next: (res) => {
          this.toast.success(res?.message || 'Employee details updated successfully.');
          this.authService.setUserDetails({
            ...this.userDetails,
            ...updatePayload,
          });

          if (this.selectedFile) {
            this.uploadOrUpdateProfileImage();
          }
        },
        error: (err) => {
          this.toast.error(err.message || 'Error saving employee');
          console.error(err);
        },
      });
    }
  }

  onPasswordSubmit() {
    if (this.passwordForm.valid) {
      const { old_password, new_password } = this.passwordForm.value;
      const payload = {
        id: this.userDetails.userId,
        old_password,
        new_password,
      };
      this.employeeServices.resetPassword(payload).subscribe({
        next: (res) => {
          this.toast.success(res.message || 'Password updated successfully');
          this.passwordForm.reset();
        },
        error: (err) => {
          this.toast.error(err.error.detail || 'Error updating password');
        }
      });
    }
  }
}