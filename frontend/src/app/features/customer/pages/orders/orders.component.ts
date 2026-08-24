import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-orders', standalone:true, imports:[CommonModule, CustomerShellComponent], templateUrl:'./orders.component.html', styleUrl:'./orders.component.scss' })
export class OrdersComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  orders=[{id:'#ORD12345',date:'23 Aug 2026',items:2,amount:798,status:'Delivered'},{id:'#ORD12344',date:'20 Aug 2026',items:1,amount:499,status:'Shipped'},{id:'#ORD12343',date:'17 Aug 2026',items:3,amount:1297,status:'Processing'},{id:'#ORD12342',date:'11 Aug 2026',items:1,amount:349,status:'Delivered'}]
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
