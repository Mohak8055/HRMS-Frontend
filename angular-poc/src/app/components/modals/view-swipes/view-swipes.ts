import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomTable, TableColumn } from '../../custom-table/custom-table';

@Component({
  selector: 'app-view-swipes',
  imports: [CustomTable],
  templateUrl: './view-swipes.html',
  styleUrl: './view-swipes.css'
})
export class ViewSwipes {
@Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() formData: any | null = null;

  columns: TableColumn[] = [
      { key: 'swipeTime', label: 'Swipe Time' },
      { key: 'inOut', label: 'In/Out' },
      { key: 'address', label: 'Door/Address' },
    ];
  
    data = [
      { swipeTime: '19:41:18', inOut: 'OUT', address: '-'},
      { swipeTime: '09:00:41', inOut: 'IN', address: '-'},
    ];

  closeModal() {
    this.close.emit();
  }
}
