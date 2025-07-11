import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditModal } from '../../components/modals/edit-modal/edit-modal';
import { DeleteModal } from '../../components/modals/delete-modal/delete-modal';
import { Breadcrum } from '../../components/breadcrum/breadcrum';
import { ClientService } from '../../services/client-service';
import { EmployeeDetails, IAllEmployees } from '../../modal/client';
import { IEmployeeList } from '../../modal/employee';
import { EmployeeServices } from '../../services/employee-services';

@Component({
  selector: 'app-employees',
  imports: [FormsModule, EditModal, DeleteModal, Breadcrum],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  clientS = inject(ClientService);
  employeeServices = inject(EmployeeServices);
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
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  employeeID = 0;

  ngOnInit(): void {
    this.fetchEmployees();
  }

  saveEmployee() {
    console.log(this.clientObject);
    if (this.clientObject.employeeId === undefined) {
      // Create new employee
      this.employeeServices.createEmployee(this.clientObject).subscribe({
        next: (res) => {
          if (res.result) {
            alert(res.message);
            this.fetchEmployees();
            this.closeEditModal();
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          alert('Error saving employee: ' + err.message);
          console.log(err);
        },
      });
    } else {
      // Update existing employee
      this.employeeServices.updateEmployee(this.clientObject).subscribe({
        next: (res) => {
          alert(res.message);
          this.fetchEmployees();
          this.closeEditModal();
          this.employeeID = 0;
        },
        error: (err) => {
          alert('Error updating employee: ' + err.message);
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
    });
  }

  getEmpById(id: number) {
    this.employeeServices.getEmployeeById(id).subscribe({
      next: (res) => {
        console.log(res.data)
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
        alert(res.message);
        this.fetchEmployees();
      },
      error: (err) => {
        alert('Error deleting employee:' + err.message);
        console.log(err);
      },
    });
  }

  onCreate() {
    this.selectedUser.set(null);
    this.showEditModal.set(true);
  }

  onEdit(item: IAllEmployees) {
    console.log(item);
    const id = item?.employeeId;
    this.getEmpById(id || 0);
    this.employeeID = item.employeeId || 0;
    this.showEditModal.set(true);
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.selectedUser.set(null);
  }

  updateUser(user: IAllEmployees) {
    console.log('onUpdate', user);
    const updatedDeatils = {
      employeeId: this.employeeID || undefined,
      employeeName: user.employeeName,
      deptId: user.deptId,
      deptName: user.deptName,
      contactNo: user.contactNo,
      emailId: user.emailId,
      role: user.role,
      password: 'Stixis@123',
    };
    this.clientObject = { ...updatedDeatils };
    this.selectedUser.set({ ...updatedDeatils });
    this.saveEmployee();
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

  onSaveClient() {}
}
