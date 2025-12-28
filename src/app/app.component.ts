import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { globalEvents$, listenToEvents, emitEvent } from './shared/event-bus.service';
import { GlobalStateService } from './shared/global-state.service';

// Declare window để access global objects
declare const window: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'shell-app';

  constructor(
    private globalState: GlobalStateService
  ) {}

  ngOnInit() {
    // Load saved state
    this.globalState.loadFromStorage();
    
    // Expose RxJS subjects và helper functions globally
    window.globalEvents$ = globalEvents$;
    window.emitEvent = emitEvent;
    window.listenToEvents = listenToEvents;
    
    // Expose GlobalState globally
    window.globalState = this.globalState;
    
    // Log tất cả events để debug
    listenToEvents().subscribe(event => {
      if (event) {
        console.log('🌐 Shell App received event:', event);
        
        // Update global state based on events
        this.updateGlobalStateFromEvent(event);
      }
    });
  }

  private updateGlobalStateFromEvent(event: any) {
    switch (event.type) {
      case 'USER_SELECTED':
      case 'USER_ROLE_CHANGED':
        this.globalState.updateUser(event.data);
        break;
        
      case 'CART_UPDATED':
        this.globalState.updateCart(event.data.items || []);
        break;
    }
  }
}
