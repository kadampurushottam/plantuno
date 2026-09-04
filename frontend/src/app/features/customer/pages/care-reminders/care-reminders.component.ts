import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({ selector:'app-care-reminders', standalone:true, imports:[CommonModule,CustomerShellComponent], templateUrl:'./care-reminders.component.html', styleUrl:'./care-reminders.component.scss' })
export class CareRemindersComponent {
  private readonly notifications=inject(NotificationService); message='';
  reminders=JSON.parse(localStorage.getItem('plantuno_reminders')||'null')||[
    {icon:'💧',title:'Water your Monstera',plant:'Monstera Deliciosa',when:'Today · 7:00 PM',done:false},
    {icon:'🌱',title:'Add organic fertilizer',plant:'Peace Lily',when:'Tomorrow · 8:00 AM',done:false},
    {icon:'🪴',title:'Repot your Aloe Vera',plant:'Aloe Vera',when:'Friday · 10:00 AM',done:false},
    {icon:'☀️',title:'Move plant to bright light',plant:'Snake Plant',when:'Saturday · 9:00 AM',done:false}
  ];
  done(r:any){r.done=true;localStorage.setItem('plantuno_reminders',JSON.stringify(this.reminders));this.notifications.add('Care task completed',r.title);this.message=`${r.title} completed`;setTimeout(()=>this.message='',1800)}
}
