import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { globalEvents$, listenToEvents, emitEvent } from './shared/event-bus.service';

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

  constructor() {}

  ngOnInit() {
    // Expose RxJS subjects và helper functions globally
    window.globalEvents$ = globalEvents$;
    window.emitEvent = emitEvent;
    window.listenToEvents = listenToEvents;
    
    // Log tất cả events để debug
    listenToEvents().subscribe(event => {
      if (event) {
        console.log('🌐 Shell App received event:', event);
      }
    });
  }
}
