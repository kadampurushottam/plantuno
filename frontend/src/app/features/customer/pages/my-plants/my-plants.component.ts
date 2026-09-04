import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({ selector:'app-my-plants', standalone:true, imports:[CommonModule,CustomerShellComponent], templateUrl:'./my-plants.component.html', styleUrl:'./my-plants.component.scss' })
export class MyPlantsComponent implements OnInit {
  private readonly http=inject(HttpClient); private readonly notifications=inject(NotificationService); message=''; loading=true;
  myPlants:any[]=[];
  ngOnInit(){this.http.get<any>('https://plantuno-backend.vercel.app/api/orders/mine').subscribe({next:r=>{const map=new Map<string,any>();for(const o of r.orders||[]){for(const i of o.items||[]){if(!map.has(i.plantId))map.set(i.plantId,{name:i.name,quantity:0,progress:65,next:'Today'});map.get(i.plantId).quantity+=i.quantity;}}this.myPlants=Array.from(map.values());if(!this.myPlants.length)this.myPlants=[{name:'Start your first plant',quantity:0,progress:0,next:'After purchase'}];this.loading=false},error:()=>{this.myPlants=[{name:'Start your first plant',quantity:0,progress:0,next:'After purchase'}];this.loading=false}})}
  careDone(p:any){p.progress=Math.min(100,p.progress+10);p.next='Tomorrow';this.notifications.add('Care completed',`${p.name} care routine was marked complete.`);this.message=`Care completed for ${p.name}`;setTimeout(()=>this.message='',1800)}
}
