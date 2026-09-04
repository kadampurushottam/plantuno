import { Injectable } from '@angular/core';

export interface AppNotification { id: string; title: string; text: string; date: string; read: boolean; }
const KEY = 'plantuno_notifications';
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private defaults: AppNotification[] = [
    { id:'welcome', title:'Welcome to PlantUno', text:'Discover plants, nurseries and plant care in one place.', date:new Date().toISOString(), read:false },
    { id:'care', title:'Plant care reminder', text:'Your Money Plant is ready for watering today.', date:new Date().toISOString(), read:false }
  ];
  get items(): AppNotification[] {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) { localStorage.setItem(KEY, JSON.stringify(this.defaults)); return this.defaults; }
      return JSON.parse(raw) as AppNotification[];
    } catch { return []; }
  }
  get unread(): number { return this.items.filter(n => !n.read).length; }
  markAllRead(): void { localStorage.setItem(KEY, JSON.stringify(this.items.map(n => ({...n, read:true})))); }
  add(title: string, text: string): void {
    const items = [{ id: crypto.randomUUID?.() || String(Date.now()), title, text, date:new Date().toISOString(), read:false }, ...this.items];
    localStorage.setItem(KEY, JSON.stringify(items));
  }
}
