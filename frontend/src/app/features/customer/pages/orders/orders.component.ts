import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { HttpClient } from '@angular/common/http';

interface Order { _id:string; createdAt:string; status:string; total:number; paymentStatus?:string; paymentMethod?:string; address?:any; items:any[]; discount?:number; deliveryFee?:number; }
@Component({ selector:'app-orders', standalone:true, imports:[CommonModule,CustomerShellComponent], templateUrl:'./orders.component.html', styleUrl:'./orders.component.scss' })
export class OrdersComponent implements OnInit {
  private readonly http=inject(HttpClient); orders:Order[]=[]; loading=true; error=''; selected:Order|null=null; filter='ALL';
  ngOnInit(){this.load()}
  load(){this.http.get<{orders:Order[]}>('https://plantuno-backend.vercel.app/api/orders/mine').subscribe({next:r=>{this.orders=r.orders||[];this.loading=false},error:e=>{this.error=e?.error?.message||'Unable to load orders';this.loading=false}})}
  get visible(){return this.filter==='ALL'?this.orders:this.orders.filter(o=>o.status===this.filter)}
  statusClass(s:string){return s.toLowerCase()}
  open(o:Order){this.selected=o}
  close(){this.selected=null}
  cancel(o:Order){this.error='Cancellation is available from the nursery/admin order workflow.'}
}
