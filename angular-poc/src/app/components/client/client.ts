import { Component, inject, OnInit, signal } from '@angular/core';
import { ClientService } from '../../services/client-service';
import { Clients, EmployeeDetails } from '../../modal/client';
import { FormsModule } from '@angular/forms';
import { IEmployeeList, ISaveEmployee } from '../../modal/employee';
import { EditModal } from '../modals/edit-modal/edit-modal';
import { DeleteModal } from '../modals/delete-modal/delete-modal';
import { Breadcrum } from "../breadcrum/breadcrum";

@Component({
  selector: 'app-client',
  imports: [FormsModule, Breadcrum],
  templateUrl: './client.html',
  styleUrl: './client.css',
})
export class Client implements OnInit {
  clientS = inject(ClientService);
  clientObject: EmployeeDetails = {
    roleId: 0,
    empId: undefined,
    userName: '',
    empCode: '',
    empName: '',
    empEmailId: '',
    empDesignationId: 0,
    empContactNo: '',
  };
  clientsList: IEmployeeList[] = [];
  selectedUser = signal<EmployeeDetails | null>(null);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  employeeID = 0;

  ngOnInit(): void {
    this.getAllClients();
  }

  saveEmployee() {
    console.log(this.clientObject)
    if (this.clientObject.empId === undefined) {
      // Create new employee
      this.clientS.saveEmployee(this.clientObject).subscribe({
        next: (res) => {
          if (res.result) {
            alert(res.message);
            this.getAllClients();
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
      this.clientS.updateEmployee(this.clientObject).subscribe({
        next: (res) => {
          alert(res.message);
          this.getAllClients();
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

  getAllClients() {
    this.clientS.getAllClients().subscribe({
      next: (res) => {
        this.clientsList = res.data;
        console.log(this.clientsList);
      },
    });
  }

  getEmpById(id: number) {
    this.clientS.getEmployeeById(id).subscribe({
      next: (res) => {
        this.selectedUser.set(res.data)
        this.clientObject = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteEmployee(id: number) {
    this.clientS.deleteEmployee(id).subscribe({
      next: (res) => {
        alert(res.message);
        this.getAllClients();
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

  onEdit(item: EmployeeDetails) {
    console.log(item)
    const id = item?.empId
    this.getEmpById(id || 0);
    this.employeeID = item.empId || 0;
    this.showEditModal.set(true);
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.selectedUser.set(null);
  }

  updateUser(user: EmployeeDetails) {
    console.log('onUpdate', user)
    const updatedDeatils = {
      roleId: Number(user.roleId),
      userName: 'Akash',
      empId: this.employeeID || undefined,
      empCode: user.empCode,
      empName: user.empName,
      empEmailId: user.empEmailId,
      empDesignationId: Number(user.empDesignationId),
      empContactNo: user.empContactNo,
      empAltContactNo: '8222222888',
      empPersonalEmailId: 'Akash@qw.com',
      empExpTotalYear: 2,
      empExpTotalMonth: 2,
      empCity: 'ABD',
      empState: 'ST',
      empPinCode: '431002',
      empAddress: 'qw',
      empPerCity: 'qw',
      empPerState: 'qw',
      empPerPinCode: '1223',
      empPerAddress: 'qw',
      password: 'qqqqq',
      ErpEmployeeSkills: [
        {
          empSkillId: 0,
          empId: 0,
          skill: 'ABC',
          totalYearExp: 1,
          lastVersionUsed: '2020',
        },
      ],
      ErmEmpExperiences: [
        {
          empExpId: 0,
          empId: 0,
          companyName: 'QQ',
          startDate: '2025-07-03T06:38:45.988Z',
          endDate: '2025-07-03T06:38:45.988Z',
          designation: 'QQ',
          projectsWorkedOn: 'qq',
        },
      ],
    };
    this.clientObject = { ...updatedDeatils };
    this.selectedUser.set({ ...updatedDeatils });
    this.saveEmployee();
  }

  openDelete(user: EmployeeDetails) {
    this.selectedUser.set(user);
    this.showDeleteModal.set(true);
  }

  onDelete(item: EmployeeDetails) {
    const id = item.empId;
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
