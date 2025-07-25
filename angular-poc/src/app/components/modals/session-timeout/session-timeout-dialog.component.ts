// session-timeout-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-session-timeout-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './session-timeout-dialog.component.html',
  styleUrls: ['./session-timeout-dialog.component.css']
})
export class SessionTimeoutDialogComponent {
  constructor(public dialogRef: MatDialogRef<SessionTimeoutDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
