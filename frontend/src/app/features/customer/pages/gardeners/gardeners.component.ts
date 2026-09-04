import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({ selector:'app-gardeners', standalone:true, imports:[CommonModule,FormsModule,CustomerShellComponent], templateUrl:'./gardeners.component.html', styleUrl:'./gardeners.component.scss' })
export class GardenersComponent {
  private readonly notifications=inject(NotificationService); message=''; selected:any=null; date=''; time='10:00'; query='';
  gardeners=[{name:'Suresh Patil',skill:'Home garden maintenance',rating:4.9,experience:8,fee:499},{name:'Rahul More',skill:'Terrace and balcony gardens',rating:4.8,experience:6,fee:399},{name:'Anita Jadhav',skill:'Indoor plant specialist',rating:4.7,experience:5,fee:349}];
  get visible(){return this.gardeners.filter(g=>!this.query||g.name.toLowerCase().includes(this.query.toLowerCase())||g.skill.toLowerCase().includes(this.query.toLowerCase()))}
  open(g:any){this.selected=g;this.date=new Date(Date.now()+86400000).toISOString().slice(0,10)} close(){this.selected=null}
  confirm(){this.notifications.add('Gardener booking confirmed',`${this.selected.name} · ${this.date} at ${this.time}`);this.message='Gardener booking confirmed';this.close();setTimeout(()=>this.message='',2000)}
}
