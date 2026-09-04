import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.model';

export interface CartItem {
  plantId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

const CART_KEY = 'plantuno_cart';
const PENDING_BUY_KEY = 'plantuno_pending_buy';

@Injectable({ providedIn: 'root' })
export class CartService {
  get items(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]') as CartItem[]; }
    catch { return []; }
  }

  get count(): number { return this.items.reduce((sum, item) => sum + item.quantity, 0); }
  get total(): number { return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0); }

  add(plant: Plant, quantity = 1): void {
    const items = this.items;
    const existing = items.find(item => item.plantId === plant._id);
    if (existing) existing.quantity += quantity;
    else items.push({ plantId: plant._id, name: plant.name, price: plant.price, image: plant.image, quantity });
    this.save(items);
  }

  updateQuantity(plantId: string, quantity: number): void {
    this.save(this.items.map(item => item.plantId === plantId ? { ...item, quantity: Math.max(1, quantity) } : item));
  }

  remove(plantId: string): void { this.save(this.items.filter(item => item.plantId !== plantId)); }
  clear(): void { localStorage.removeItem(CART_KEY); }

  setPendingBuy(plant: Plant): void {
    localStorage.setItem(PENDING_BUY_KEY, JSON.stringify({ plantId: plant._id, plant }));
  }

  consumePendingBuy(): Plant | null {
    const raw = localStorage.getItem(PENDING_BUY_KEY);
    if (!raw) return null;
    localStorage.removeItem(PENDING_BUY_KEY);
    try { return JSON.parse(raw).plant as Plant; }
    catch { return null; }
  }

  hasPendingBuy(): boolean { return !!localStorage.getItem(PENDING_BUY_KEY); }

  private save(items: CartItem[]): void { localStorage.setItem(CART_KEY, JSON.stringify(items)); }
}
