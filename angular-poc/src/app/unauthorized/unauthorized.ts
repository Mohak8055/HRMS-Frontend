import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `<div style='text-align:center; margin-top: 50px;'><h2>Unauthorized</h2><p>You do not have permission to view this page.</p></div>`,
})
export class Unauthorized {} 