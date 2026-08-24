import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-my-plants', standalone:true, imports:[CommonModule, CustomerShellComponent], templateUrl:'./my-plants.component.html', styleUrl:'./my-plants.component.scss' })
export class MyPlantsComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  myPlants=[{name:'Monstera Deliciosa',next:'Today, 7:00 PM',progress:82},{name:'Snake Plant',next:'Tomorrow, 8:00 AM',progress:65},{name:'Aloe Vera',next:'Friday, 7:30 AM',progress:91},{name:'Peace Lily',next:'Saturday, 6:30 PM',progress:74}]
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
