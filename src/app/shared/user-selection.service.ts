import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SelectedUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {
  private selectedUserSubject = new BehaviorSubject<SelectedUser | null>(null);
  
  selectedUser$ = this.selectedUserSubject.asObservable();

  selectUser(user: SelectedUser) {
    this.selectedUserSubject.next(user);
    console.log('👤 User selected:', user);
  }

  clearSelection() {
    this.selectedUserSubject.next(null);
  }

  getCurrentUser(): SelectedUser | null {
    return this.selectedUserSubject.value;
  }
}