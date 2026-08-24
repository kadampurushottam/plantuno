import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-offers', standalone:true, imports:[CommonModule, CustomerShellComponent], templateUrl:'./offers.component.html', styleUrl:'./offers.component.scss' })
export class OffersComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  offers=[{badge:'20% OFF',title:'Green Home Starter',text:'Save on your first plant order above ₹999.',code:'GREEN20'},{badge:'₹150 OFF',title:'Nursery Week',text:'Flat discount on orders from participating nurseries.',code:'NURSERY150'},{badge:'15% OFF',title:'Care Services',text:'Book a gardener or plant doctor this week.',code:'CARE15'}]
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
