import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searchByControl = new FormControl('', Validators.required);
  searchValueControl = new FormControl('', Validators.required);
  @Output() search = new EventEmitter<{ by: string; value: string }>();
  @Input() searchOptions: {
    label: string;
    value: string;
    type: string | 'text' | 'select';
    options?: { label: string; value: string }[] | undefined;
  }[] = [];

  get selectedSearchOption() {
  return this.searchOptions.find(opt => opt.value === this.searchByControl.value);
}

ngOnInit(): void {
  this.searchByControl.valueChanges
    .pipe(debounceTime(100), distinctUntilChanged())
    .subscribe(() => {
      this.searchValueControl.reset();
    });
}

  onSearch(): void {
    const by = this.searchByControl.value;
    const value = this.searchValueControl.value;
    if (by && value) {
      this.search.emit({ by, value });
    } else {
      this.searchByControl.markAsTouched();
      this.searchValueControl.markAllAsTouched();
    }
  }
  onClear(): void {
    this.searchByControl.reset();
    this.searchValueControl.reset();
    this.search.emit({ by: '', value: '' });
  }
}
