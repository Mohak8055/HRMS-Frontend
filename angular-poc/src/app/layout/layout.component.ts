import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { WebsocketService } from '../services/websocket.service';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';

// Define an interface for the new message structure
interface BroadcastMessage {
  id: string;
  content: { message: string };
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  websocketService = inject(WebsocketService);
  authService = inject(Auth);
  broadcastMessage: BroadcastMessage | null = null;
  private cdRef = inject(ChangeDetectorRef);

  private get dismissedMessagesKey(): string {
    const userDetails = this.authService.getUserDetails();
    return `dismissedBroadcasts_${userDetails?.userId}`;
  }

  ngOnInit() {
    this.websocketService.messages$.subscribe((message: BroadcastMessage) => {
      const dismissed = this.getDismissedMessages();
      // Only show the message if its ID has not been dismissed
      if (!dismissed.includes(message.id)) {
        this.broadcastMessage = message;
        this.cdRef.detectChanges();
      }
    });
  }

  private getDismissedMessages(): string[] {
    const dismissed = sessionStorage.getItem(this.dismissedMessagesKey);
    return dismissed ? JSON.parse(dismissed) : [];
  }

  dismissBroadcast() {
    if (this.broadcastMessage) {
      const dismissed = this.getDismissedMessages();
      dismissed.push(this.broadcastMessage.id);
      // Store the ID of the dismissed message in sessionStorage
      sessionStorage.setItem(this.dismissedMessagesKey, JSON.stringify(dismissed));
      this.broadcastMessage = null;
    }
  }
}