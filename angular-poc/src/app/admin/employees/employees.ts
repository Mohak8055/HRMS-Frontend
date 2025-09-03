import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteModal } from '../../components/modals/delete-modal/delete-modal';
import { Breadcrum } from '../../components/breadcrum/breadcrum';
import { ClientService } from '../../services/client-service';
import { Employee, IAllEmployees } from '../../modal/client';
import { EmployeeServices } from '../../services/employee-services';
import { CustomTable, TableColumn } from '../../components/custom-table/custom-table';
import { CreateUpdateEmployeeModal } from '../../components/modals/create-update-employee-modal/create-update-employee-modal';
import { ToastServices } from '../../services/toast/toast-services';
import { SearchBar } from '../../components/search-bar/search-bar';
import { PageEvent } from '@angular/material/paginator';
import { DeptOptions } from '../../modal/employee';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    FormsModule,
    DeleteModal,
    Breadcrum,
    CustomTable,
    CreateUpdateEmployeeModal,
    SearchBar,
    CommonModule
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  clientS = inject(ClientService);
  employeeServices = inject(EmployeeServices);
  toast = inject(ToastServices);
  params = {
    page: 1,
    pageSize: 10,
  };
  loading = true;
  totalEmployees = 0;
  departements: DeptOptions[] = [];
  roles: any[] = [];
  clientObject: Employee = {
    id: undefined,
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    dob: '',
    doj: '',
    departmentId: 0,
    managerId: 0,
    active: true,
    createdAt: '',
    updatedAt: '',
    password: '',
    roleId: 0,
  };
  clientsList: any[] = [];
  selectedUser = signal<Employee | null>(null);
  showDeleteModal = signal(false);
  showCreateUpdateModal = signal(false);
  employeeID = 0;
  isEditMode = signal(false);
  showBulkUploadModal = false;
  selectedFile: File | null = null;
  uploadProgress = 0;
  uploadResult: any = null;
  fileError: string | null = null;

  columns: TableColumn[] = [
    { key: 'index', label: 'Sr.No', type: 'index' },
    { key: 'id', label: 'Employee ID' },
    {
      key: 'firstName',
      label: 'Name',
      render: (row: any) =>
        row.firstName
          ? row.firstName.charAt(0).toUpperCase() +
            row.firstName.slice(1).toLowerCase() +
            ' ' +
            row.lastName.charAt(0).toUpperCase() +
            row.lastName.slice(1).toLowerCase()
          : '',
    },
    { key: 'email', label: 'Email Id', type: 'text' },
    {
      key: 'phone',
      label: 'Mobile Number',
      render: (row: any) => {
        if (row.phone) {
          return Math.floor(row.phone).toString();
        }
        return '';
      }
    },
    {
      key: 'departmentId',
      label: 'Departement Name',
      render: (row: any) => row?.department?.name,
    },
    { key: 'roleId', label: 'Role', render: (row: any) => row?.role?.name },
    {
      key: 'active',
      label: 'Status',
      render: (row: any) => (row?.active ? 'Active' : 'InActive'),
    },
  ];

  actions = [
    { label: 'Edit', icon: 'edit', color: 'secondary', action: 'edit' },
    { label: 'Delete', icon: 'delete', color: 'warn', action: 'delete' },
  ];

  onRowClick(row: any) {
    console.log('Row Clicked:', row);
  }

  onActionClick(event: { row: any; action: string }) {
    const { row, action } = event;
    if (action === 'edit') {
      this.onEdit(row);
    } else if (action === 'delete') {
      this.openDelete(row);
    }
  }

  ngOnInit(): void {
    this.fetchEmployees();
    this.getAllRoles();
    this.fetchAllDepartements();
  }
  
  openBulkUploadModal() {
    this.showBulkUploadModal = true;
  }

  closeBulkUploadModal() {
    this.showBulkUploadModal = false;
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploadResult = null;
    this.fileError = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith('.xlsx')) {
        this.selectedFile = file;
        this.fileError = null;
      } else {
        this.selectedFile = null;
        this.fileError = 'Invalid file type. Please upload an Excel file (.xlsx).';
      }
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.uploadProgress = 1; // Start progress
      this.employeeServices.bulkCreateEmployees(this.selectedFile).subscribe(
        (event: any) => {
          this.uploadProgress = 100;
          this.uploadResult = event;
          this.fetchEmployees(); // Refresh the list
        },
        (err: any) => {
          this.toast.error('Upload failed');
          this.uploadProgress = 0;
        }
      );
    }
  }

  getAllRoles() {
    this.employeeServices.getAllRoles().subscribe({
      next: (res) => {
        const formattedRoles = res.map((role: any) => ({
          label: role.name,
          value: role.name,
        }));
        const rolesField = this.searchFields.find(
          (field) => field.value === 'role'
        );
        if (rolesField) {
          rolesField.options = formattedRoles;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchAllDepartements() {
    this.employeeServices.getAllDepartements().subscribe({
      next: (res) => {
        const formattedDept = res.map((dept: any) => ({
          label: dept.name,
          value: dept.name,
        }));
        const deptField = this.searchFields.find(
          (field) => field.value === 'department'
        );
        if (deptField) {
          deptField.options = formattedDept;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveEmployee() {
    if (this.employeeID === 0) {
      // Create new employee
      this.employeeServices.createEmployee(this.clientObject).subscribe({
        next: (res) => {
          this.fetchEmployees();
          this.toast.success(res.message || 'Employee created successfully.');
          this.closeModal();
        },
        error: (err) => {
          this.toast.error(err.message || 'Error saving employee');
          console.log(err);
        },
      });
    } else {
      // Update existing employee
      this.employeeServices.updateEmployee(this.clientObject).subscribe({
        next: (res) => {
          this.fetchEmployees();
          this.toast.success(
            res?.message || 'Employee details updated successfully.'
          );
          this.closeModal();
          this.employeeID = 0;
        },
        error: (err) => {
          this.toast.error(err.message || 'Error saving employee');
          console.log(err);
        },
      });
    }
  }

  handlePageChange(event: PageEvent) {
    this.params.page = event.pageIndex + 1;
    this.params.pageSize = event.pageSize;
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.loading = true;
    this.employeeServices.getAllEmployees(this.params).subscribe({
      next: (res) => {
        this.clientsList = res?.users;
        this.totalEmployees = res?.total;
      },
      error: (err) => {
        console.log('Something went wrong', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getEmpById(id: number) {
    this.employeeServices.getEmployeeById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.selectedUser.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteEmployee(id: number) {
    const payload = {
      id: id,
      status: false,
    };
    this.employeeServices.deleteEmployee(payload).subscribe({
      next: (res) => {
        this.toast.success(res.message || 'Employee deteled successfully');
        this.fetchEmployees();
      },
      error: (err) => {
        this.toast.error(err.message || 'Error deleting employee');
        console.log(err);
      },
    });
  }

  onCreate() {
    this.selectedUser.set(null);
    this.clientObject = {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      dob: '',
      doj: '',
      departmentId: 0,
      managerId: 0,
      active: true,
      createdAt: '',
      updatedAt: '',
      password: '',
      roleId: 0,
    };
    this.isEditMode.set(false);
    this.showCreateUpdateModal.set(true);
  }

  onEdit(item: Employee) {
    console.log(item);
    const id = item?.id;
    this.getEmpById(id || 0);
    this.employeeID = id || 0;
    this.isEditMode.set(true);
    this.showCreateUpdateModal.set(true);
  }

  openDelete(user: Employee) {
    this.selectedUser.set(user);
    if (user.active) {
      this.showDeleteModal.set(true);
    } else {
      alert('Selected user is InActive');
    }
  }

  onDelete(item: Employee) {
    const id = item.id;
    console.log(id);
    this.deleteEmployee(id || 0);
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.selectedUser.set(null);
  }

  showModal() {
    this.showCreateUpdateModal.set(true);
  }
  closeModal() {
    this.showCreateUpdateModal.set(false);
  }
  submitModal = (user: Employee) => {
    console.log(user);
    const updatedDeatils = {
      ...user,
      id: this.employeeID || undefined,
      password: 'Stixis@123',
    };
    this.clientObject = { ...updatedDeatils };
    this.selectedUser.set({ ...updatedDeatils });
    this.saveEmployee();
  };

  searchFields = [
    { label: 'Name', value: 'name', type: 'text' },
    { label: 'Mobile Number', value: 'phone', type: 'text' },
    { label: 'Email Address', value: 'email', type: 'text' },
    { label: 'Department', value: 'department', type: 'select', options: [] },
    { label: 'Role', value: 'role', type: 'select', options: [] },
    {
      label: 'Status',
      value: 'active',
      type: 'select',
      options: [
        { label: 'Active', value: 'true' },
        { label: 'InActive', value: 'false' },
      ],
    },
  ];
  onSearchHandler(event: { by: string; value: string }) {
    console.log(event.by, event.value);
    const params = {
      ...this.params,
      search: {
        key: event.by,
        value: event.value,
      },
    };
    this.params = params;
    this.fetchEmployees();
    console.log('Search request received:', event);
  }

  exportEmployees() {
    this.employeeServices.exportUsers().subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        this.toast.error('Failed to export employees.');
        console.error('Export error:', error);
      }
    );
  }
}