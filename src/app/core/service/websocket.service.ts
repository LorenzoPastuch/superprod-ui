import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket = webSocket(`${environment.websocket}/ws/pcp/`); // URL do WebSocket

  connect() {
    return this.socket.asObservable();
  }

  disconnect() {
    this.socket.complete();
  }
  
}
