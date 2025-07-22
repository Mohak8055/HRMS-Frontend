import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'chip' | 'custom' | 'index';
  width?: string;
  isIndex?: boolean;
  render?: (row: any, index?: number) => string | TemplateRef<any>;
}

@Component({
  selector: 'app-custom-table',
  imports: [
    CommonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonModule,
  ],
  templateUrl: './custom-table.html',
  styleUrl: './custom-table.scss',
})
export class CustomTable implements AfterViewInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() pageSize = 10;
  @Input() actions: {
    label: string;
    icon?: string;
    color?: string;
    action: string;
  }[] = [];
  @Input() showPagination: boolean = true;

  @Output() rowClick = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{ row: any; action: string }>();

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(): void {
    this.configureTable();
  }

  private configureTable(): void {
    if (!this.columns || !this.data) return;

    this.displayedColumns = this.columns.map((col) => col.key);
    if (this.actions && this.actions.length > 0) {
      this.displayedColumns.push('actions');
    }

    this.dataSource = new MatTableDataSource(this.data);

    // Assign paginator & sort safely after view init
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getIndex(i: number): number {
    if (this.paginator) {
      return i + 1 + this.paginator.pageIndex * this.paginator.pageSize;
    }
    return i + 1;
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }
}
