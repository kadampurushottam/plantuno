import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerStats {
  orders:number; totalSpent:number; plantsBought:number; activeOrders:number; recentOrders:Array<{id:string;createdAt:string;status:string;total:number;items:Array<{name:string;quantity:number}>}>;
}
export interface NurseryStats {
  revenue:number; orders:number; unitsSold:number; inventory:number; rating:number;
  revenueByDay:Array<{date:string;value:number}>;
  recentOrders:Array<{id:string;createdAt:string;status:string;total:number;items:Array<{name:string;quantity:number}>}>;
}
export interface AdminStats {
  revenue:number; orders:number; customers:number; nurseries:number; plants:number; unitsSold:number;
  revenueByMonth:Array<{month:string;value:number}>;
  orderStatus:Array<{status:string;value:number}>;
  recentOrders:Array<{id:string;createdAt:string;status:string;total:number;items:number;units:number}>;
}

@Injectable({providedIn:'root'})
export class AnalyticsService {
  private readonly http=inject(HttpClient);
  private readonly api='https://plantuno-backend.vercel.app/api/orders';
  customer():Observable<CustomerStats>{return this.http.get<CustomerStats>(`${this.api}/mine/stats`);}
  nursery():Observable<NurseryStats>{return this.http.get<NurseryStats>(`${this.api}/nursery/stats`);}
  admin():Observable<AdminStats>{return this.http.get<AdminStats>(`${this.api}/admin/stats`);}
}
