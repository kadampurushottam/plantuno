import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-plant-doctors', standalone:true, imports:[CommonModule, CustomerShellComponent], templateUrl:'./plant-doctors.component.html', styleUrl:'./plant-doctors.component.scss' })
export class PlantDoctorsComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  doctors=[{name:'Dr. Riya Kulkarni',speciality:'Indoor & flowering plants',fee:299},{name:'Dr. Amit Joshi',speciality:'Pest and disease diagnosis',fee:399},{name:'Dr. Neha Shah',speciality:'Terrace garden specialist',fee:349}]
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
