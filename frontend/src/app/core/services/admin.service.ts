import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUser { _id:string; name:string; email:string; role:string; createdAt:string; location?:any; }
export interface AdminPlant { _id:string; name:string; category:string; price:number; image?:string; nurseryId?:any; featured?:boolean; }
export interface AdminOrder { _id:string; customer:string; email:string; total:number; status:string; paymentStatus:string; createdAt:string; items:any[]; }

@Injectable({providedIn:'root'})
export class AdminService {
 private http=inject(HttpClient); private api='https://plantuno-backend.vercel.app/api/admin';
 users():Observable<{items:AdminUser[]}>{return this.http.get<{items:AdminUser[]}>(`${this.api}/users`)}
 updateUser(id:string,role:string){return this.http.patch(`${this.api}/users/${id}`,{role})}
 nurseries():Observable<{items:any[]}>{return this.http.get<{items:any[]}>(`${this.api}/nurseries`)}
 plants():Observable<{items:AdminPlant[]}>{return this.http.get<{items:AdminPlant[]}>(`${this.api}/plants`)}
 createPlant(payload:any){return this.http.post(`${this.api}/plants`,payload)}
 updatePlant(id:string,payload:any){return this.http.put(`${this.api}/plants/${id}`,payload)}
 deletePlant(id:string){return this.http.delete(`${this.api}/plants/${id}`)}
 orders():Observable<{items:AdminOrder[]}>{return this.http.get<{items:AdminOrder[]}>(`${this.api}/orders`)}
 updateOrder(id:string,payload:any){return this.http.patch(`${this.api}/orders/${id}`,payload)}
 reports(){return this.http.get<any>(`${this.api}/reports`)}
 activities(){return this.http.get<{items:any[]}>(`${this.api}/activities`)}
}
