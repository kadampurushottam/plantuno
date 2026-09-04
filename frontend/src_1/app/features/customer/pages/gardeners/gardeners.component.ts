import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-gardeners', standalone:true, imports:[CommonModule, CustomerShellComponent], templateUrl:'./gardeners.component.html', styleUrl:'./gardeners.component.scss' })
export class GardenersComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  gardeners=[{name:'Suresh Patil',skill:'Home garden maintenance',rating:4.9,experience:8},{name:'Rahul More',skill:'Terrace and balcony gardens',rating:4.8,experience:6},{name:'Anita Jadhav',skill:'Indoor plant specialist',rating:4.7,experience:5}]
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
