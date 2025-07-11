import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrum',
  imports: [RouterModule],
  templateUrl: './breadcrum.html',
  styleUrl: './breadcrum.css'
})
export class Breadcrum {
  @Input() items: BreadcrumbItem[] = [];

}
