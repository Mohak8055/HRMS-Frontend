import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.socket$ = webSocket('ws://127.0.0.1:8000/broadcast/ws');
    this.socket$.subscribe(
      (message) => this.messagesSubject.next(message),
      (err) => console.error(err),
      () => console.warn('Completed!')
    );
  }
}