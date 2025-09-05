import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { WebsocketService } from '../services/websocket.service';
import { ToastServices } from '../services/toast/toast-services';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  websocketService = inject(WebsocketService);
  toast = inject(ToastServices);

  ngOnInit() {
    this.websocketService.messages$.subscribe((message: any) => {
      this.toast.info(`Broadcast: ${message.message}`);
    });
  }
}