import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbDatepickerModule,
  ],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DatePicker {
  @Input() label: string = 'Select Date';
  @Input() placeholder: string = 'MM/DD/YYYY';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() picker: string = ''

  @Input() value: Date | null = null;
  @Output() valueChange = new EventEmitter<string>();
  @Input() errorMessage: string | '' = '';

  onDateChange(event: any): void {
    const selectedDate = event.value;
    // Convert selected date to UTC midnight
    const utcDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );

    this.valueChange.emit(utcDate.toISOString());
  }
}
