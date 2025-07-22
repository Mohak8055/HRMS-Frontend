import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployeeList } from '../../../modal/employee';
import { Employee, EmployeeDetails, IAllEmployees } from '../../../modal/client';

@Component({
  selector: 'app-delete-modal',
  imports: [CommonModule],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css',
})
export class DeleteModal {
  @Input() employee: Employee | null = null;
  @Input() visible: boolean = false;
  // @Input() id:number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<Employee>();

  handleDelete() {
    if (this.employee) this.confirm.emit(this.employee);
  }

  handleClose() {
    this.close.emit();
  }
}
