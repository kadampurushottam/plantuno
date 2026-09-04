import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({ selector:'app-plant-doctors', standalone:true, imports:[CommonModule,FormsModule,CustomerShellComponent], templateUrl:'./plant-doctors.component.html', styleUrl:'./plant-doctors.component.scss' })
export class PlantDoctorsComponent {
  private readonly notifications=inject(NotificationService); message=''; selected:any=null; booking={date:'',time:'10:00'};
  doctors=[{name:'Dr. Riya Kulkarni',speciality:'Indoor & flowering plants',fee:299,rating:4.9,exp:'8 yrs'},{name:'Dr. Amit Joshi',speciality:'Pest and disease diagnosis',fee:399,rating:4.8,exp:'10 yrs'},{name:'Dr. Neha Shah',speciality:'Terrace garden specialist',fee:349,rating:4.9,exp:'7 yrs'}];
  open(d:any){this.selected=d;this.booking.date=new Date(Date.now()+86400000).toISOString().slice(0,10)}
  close(){this.selected=null}
  confirm(){if(!this.selected||!this.booking.date)return;const appt={doctor:this.selected.name,...this.booking,fee:this.selected.fee};localStorage.setItem('plantuno_last_appointment',JSON.stringify(appt));this.notifications.add('Doctor appointment booked',`${this.selected.name} · ${this.booking.date} at ${this.booking.time}`);this.message='Appointment booked successfully';this.selected=null;setTimeout(()=>this.message='',2200)}
}
