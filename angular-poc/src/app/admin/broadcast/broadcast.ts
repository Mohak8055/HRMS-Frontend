import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastServices } from '../../services/toast/toast-services';

@Component({
  selector: 'app-broadcast',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './broadcast.html',
})
export class BroadcastComponent {
  message = '';
  http = inject(HttpClient);
  toast = inject(ToastServices);

  sendMessage() {
    if (this.message.trim()) {
      this.http.post('http://127.0.0.1:8000/broadcast/broadcast', { message: this.message }).subscribe({
        next: () => {
          this.toast.success('Broadcast message sent successfully.');
          this.message = '';
        },
        error: () => {
          this.toast.error('Failed to send broadcast message.');
        }
      });
    }
  }
}