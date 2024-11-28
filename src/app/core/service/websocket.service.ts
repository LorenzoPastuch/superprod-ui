import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket = webSocket('ws://localhost:8000/ws/pcp/'); // URL do WebSocket

  connect() {
    return this.socket.asObservable();
  }

  disconnect() {
    this.socket.complete();
  }
  
}
