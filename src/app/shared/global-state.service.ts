import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GlobalState {
  currentUser: any;
  selectedProducts: any[];
  cartItems: any[];
  analytics: any;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private stateSubject = new BehaviorSubject<GlobalState>({
    currentUser: {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      role: 'Admin',
      avatar: 'https://via.placeholder.com/150',
      joinDate: '2023-01-15',
      lastLogin: '2024-12-24 10:30:00'
    },
    selectedProducts: [],
    cartItems: [],
    analytics: {}
  });

  state$ = this.stateSubject.asObservable();

  updateUser(user: any) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      currentUser: { ...currentState.currentUser, ...user }
    });
    
    // Persist to localStorage
    this.saveToStorage();
  }

  updateCart(cartItems: any[]) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      cartItems
    });
    this.saveToStorage();
  }

  getCurrentState(): GlobalState {
    return this.stateSubject.value;
  }

  private saveToStorage() {
    localStorage.setItem('mfe-global-state', JSON.stringify(this.stateSubject.value));
  }

  loadFromStorage() {
    const saved = localStorage.getItem('mfe-global-state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.stateSubject.next(state);
        console.log('🔄 Restored global state');
      } catch (error) {
        console.warn('Failed to load global state:', error);
      }
    }
  }
}