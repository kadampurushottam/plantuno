import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.model';

const KEY = 'plantuno_wishlist';
@Injectable({ providedIn: 'root' })
export class WishlistService {
  get items(): Plant[] { try { return JSON.parse(localStorage.getItem(KEY) || '[]') as Plant[]; } catch { return []; } }
  get count(): number { return this.items.length; }
  has(id: string): boolean { return this.items.some(p => p._id === id); }
  toggle(plant: Plant): boolean {
    const items = this.items;
    const index = items.findIndex(p => p._id === plant._id);
    if (index >= 0) items.splice(index, 1); else items.push(plant);
    localStorage.setItem(KEY, JSON.stringify(items));
    return index < 0;
  }
  remove(id: string): void { localStorage.setItem(KEY, JSON.stringify(this.items.filter(p => p._id !== id))); }
}
