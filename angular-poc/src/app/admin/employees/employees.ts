import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteModal } from '../../components/modals/delete-modal/delete-modal';
import { Breadcrum } from '../../components/breadcrum/breadcrum';
import { ClientService } from '../../services/client-service';
import { Employee, IAllEmployees } from '../../modal/client';
import { EmployeeServices } from '../../services/employee-services';
import {
  CustomTable,
  TableColumn,
} from '../../components/custom-table/custom-table';
import { CreateUpdateEmployeeModal } from '../../components/modals/create-update-employee-modal/create-update-employee-modal';
import { ToastServices } from '../../services/toast/toast-services';

@Component({
  selector: 'app-employees',
  imports: [
    FormsModule,
    DeleteModal,
    Breadcrum,
    CustomTable,
    CreateUpdateEmployeeModal,
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  clientS = inject(ClientService);
  employeeServices = inject(EmployeeServices);
  toast = inject(ToastServices);
  clientObject: IAllEmployees = {
    employeeId: 0,
    employeeName: '',
    deptId: 0,
    deptName: '',
    contactNo: '',
    emailId: '',
    role: '',
  };
  clientsList: any[] = [];
  selectedUser = signal<IAllEmployees | null>(null);
  showDeleteModal = signal(false);
  showCreateUpdateModal = signal(false);
  employeeID = 0;
  isEditMode = signal(false);

  columns: TableColumn[] = [
    { key: 'index', label: 'Sr.No', type: 'index' },
    { key: 'employeeId', label: 'Employee ID' },
    {
      key: 'employeeName',
      label: 'Name',
      render: (row: any) =>
        row.employeeName
          ? row.employeeName.charAt(0).toUpperCase() +
            row.employeeName.slice(1).toLowerCase()
          : '',
    },
    { key: 'emailId', label: 'Email Id', type: 'text' },
    { key: 'contactNo', label: 'Mobile Number' },
    { key: 'deptName', label: 'Departement Name' },
    { key: 'role', label: 'Role' },
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
  }

  saveEmployee() {
    if (this.clientObject.employeeId === undefined) {
      // Create new employee
      this.employeeServices.createEmployee(this.clientObject).subscribe({
        next: (res) => {
          if (res.result) {
            this.fetchEmployees();
            this.toast.success(res.message || 'Employee created successfully.');
            this.closeModal();
          } else {
            this.toast.warning(res.message || 'Invalid data');
          }
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
          this.toast.success(res?.message || 'Employee details updated successfully.');
          this.closeModal();
          this.employeeID = 0;
        },
        error: (err) => {
          this.toast.error(err.message || 'Error saving employee')
          console.log(err);
        },
      });
    }
  }

  fetchEmployees() {
    this.employeeServices.getAllEmployees().subscribe({
      next: (res) => {
        this.clientsList = res.data;
        console.log(this.clientsList);
      },
      error: (err) => {
        console.log('Something went wrong', err);
      },
    });
  }

  getEmpById(id: number) {
    this.employeeServices.getEmployeeById(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.selectedUser.set(res.data);
        // this.clientObject = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteEmployee(id: number) {
    this.employeeServices.deleteEmployee(id).subscribe({
      next: (res) => {
        if (res.result) {
        this.toast.success(res.message || 'Employee deteled successfully');
        this.fetchEmployees();
        } else {
        this.toast.warning(res.message || 'Something went wrong');
        }
      },
      error: (err) => {
        this.toast.error(err.message || 'Error deleting employee')
        console.log(err);
      },
    });
  }

  onCreate() {
    this.selectedUser.set(null);
    this.clientObject = {
      employeeId: 0,
      employeeName: '',
      deptId: 0,
      deptName: '',
      contactNo: '',
      emailId: '',
      role: '',
    };
    this.isEditMode.set(false);
    this.showCreateUpdateModal.set(true);
  }

  onEdit(item: IAllEmployees) {
    console.log(item);
    const id = item?.employeeId;
    this.getEmpById(id || 0);
    this.employeeID = item.employeeId || 0;
    this.isEditMode.set(true);
    this.showCreateUpdateModal.set(true);
  }

  openDelete(user: IAllEmployees) {
    this.selectedUser.set(user);
    this.showDeleteModal.set(true);
  }

  onDelete(item: IAllEmployees) {
    const id = item.employeeId;
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
      employeeId: this.employeeID || undefined,
      employeeName: user.employeeName,
      deptId: user.deptId,
      deptName: '',
      contactNo: user.contactNo,
      emailId: user.emailId,
      role: user.role,
      password: 'Stixis@123',
    };
    this.clientObject = { ...updatedDeatils };
    this.selectedUser.set({ ...updatedDeatils });
    this.saveEmployee();
  };
}
