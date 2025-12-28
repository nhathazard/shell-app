import { BehaviorSubject } from 'rxjs';

export interface AppEvent {
  type: string;
  data: any;
  source: string;
}

// Tạo global RxJS subjects trực tiếp
export const globalEvents$ = new BehaviorSubject<AppEvent | null>(null);

// Helper functions để dễ sử dụng
export function emitEvent(type: string, data: any, source: string) {
  const event: AppEvent = { type, data, source };
  globalEvents$.next(event);
  console.log(`🚀 Event emitted:`, event);
}

export function listenToEvents() {
  return globalEvents$.asObservable();
}