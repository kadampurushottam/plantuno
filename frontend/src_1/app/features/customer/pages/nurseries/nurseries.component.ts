import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-nurseries', standalone:true, imports:[CommonModule, FormsModule, CustomerShellComponent], templateUrl:'./nurseries.component.html', styleUrl:'./nurseries.component.scss' })
export class NurseriesComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  nurseries=[{name:'Green Paradise Nursery',distance:'0.8 km away',rating:'4.8 (128)',plants:50},{name:'Sai Garden Center',distance:'1.2 km away',rating:'4.6 (96)',plants:40},{name:'Bloom World Nursery',distance:'1.5 km away',rating:'4.7 (104)',plants:60},{name:'Urban Leaf Nursery',distance:'2.4 km away',rating:'4.5 (82)',plants:35}]
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
