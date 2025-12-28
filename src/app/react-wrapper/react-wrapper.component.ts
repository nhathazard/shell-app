import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './react-wrapper.component.html',
  styleUrl: './react-wrapper.component.scss'
})
export class ReactWrapperComponent implements OnInit, OnDestroy {
  @ViewChild('reactContainer', { static: true }) reactContainer!: ElementRef;
  private eventForwarder: any;

  async ngOnInit() {
    this.loadReactMFE();
  }

  private loadReactMFE() {
    // Create iframe with proper settings
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:4204';
    iframe.style.width = '100%';
    iframe.style.height = '800px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    
    // Prevent infinite reload
    iframe.onload = () => {
      console.log('✅ React MFE loaded successfully');
      this.setupEventForwarding(iframe);
    };
    
    iframe.onerror = () => {
      console.error('❌ Failed to load React MFE');
      this.showErrorMessage();
    };
    
    // Add loading state
    this.reactContainer.nativeElement.innerHTML = `
      <div style="
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        height: 400px; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        text-align: center;
      ">
        <div style="font-size: 3rem; margin-bottom: 20px;">📊</div>
        <h3 style="margin: 0 0 10px 0;">Loading React Analytics MFE...</h3>
        <p style="margin: 0; opacity: 0.8;">Connecting to http://localhost:4204</p>
        <div style="
          width: 40px; 
          height: 40px; 
          border: 3px solid rgba(255,255,255,0.3); 
          border-top: 3px solid white; 
          border-radius: 50%; 
          animation: spin 1s linear infinite;
          margin-top: 20px;
        "></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    
    // Append iframe
    setTimeout(() => {
      this.reactContainer.nativeElement.innerHTML = '';
      this.reactContainer.nativeElement.appendChild(iframe);
    }, 1000);
  }

  private setupEventForwarding(iframe: HTMLIFrameElement) {
    // Forward Angular events to React MFE
    if ((window as any).eventBus) {
      this.eventForwarder = (window as any).eventBus.events$.subscribe((event: any) => {
        if (event && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage({
              type: 'ANGULAR_EVENT',
              event: event
            }, 'http://localhost:4204');
          } catch (error) {
            console.warn('Failed to forward event to React MFE:', error);
          }
        }
      });
    }
  }

  private showErrorMessage() {
    this.reactContainer.nativeElement.innerHTML = `
      <div style="
        padding: 40px; 
        text-align: center; 
        background: #f8f9fa; 
        border-radius: 12px; 
        border: 2px solid #e74c3c;
        color: #2c3e50;
      ">
        <div style="font-size: 4rem; margin-bottom: 20px;">⚠️</div>
        <h3 style="color: #e74c3c; margin-bottom: 20px;">React Analytics MFE Not Available</h3>
        
        <p style="margin-bottom: 20px;">
          The React Analytics dashboard is not running. Please start it manually:
        </p>
        
        <div style="
          background: #2c3e50; 
          color: white; 
          padding: 15px; 
          border-radius: 8px; 
          font-family: 'Courier New', monospace; 
          margin: 20px 0;
          text-align: left;
        ">
          cd mfe-analytics<br>
          npm run dev
        </div>
        
        <p style="margin-bottom: 30px;">
          Then refresh this page to see the React Analytics Dashboard
        </p>
        
        <button onclick="window.location.reload()" style="
          background: #3498db; 
          color: white; 
          border: none; 
          padding: 12px 24px; 
          border-radius: 6px; 
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        ">
          🔄 Refresh Page
        </button>
        
        <div style="
          margin-top: 30px; 
          padding: 20px; 
          background: #e8f5e8; 
          border-radius: 8px;
          border-left: 4px solid #27ae60;
        ">
          <h4 style="color: #27ae60; margin-bottom: 10px;">💡 Demo Still Works!</h4>
          <p style="margin: 0;">
            You can still test Angular MFE communication with Products, Users, and Cart tabs.
            The React Analytics is an additional feature to demonstrate technology diversity.
          </p>
        </div>
      </div>
    `;
  }

  ngOnDestroy() {
    if (this.eventForwarder) {
      this.eventForwarder.unsubscribe();
    }
  }
}
