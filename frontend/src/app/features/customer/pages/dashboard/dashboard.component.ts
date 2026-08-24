import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NurseryLocation, NurseryService } from '../../../../core/services/nursery.service';
import { AnalyticsService, CustomerStats } from '../../../../core/services/analytics.service';

@Component({selector:'app-customer-dashboard',standalone:true,imports:[CommonModule,RouterLink],templateUrl:'./dashboard.component.html',styleUrl:'./dashboard.component.scss'})
export class DashboardComponent implements OnInit {
  readonly auth=inject(AuthService); private readonly nurseryService=inject(NurseryService); private readonly analytics=inject(AnalyticsService);
  nearbyNurseries:NurseryLocation[]=[]; stats:CustomerStats={orders:0,totalSpent:0,plantsBought:0,activeOrders:0,recentOrders:[]}; loading=true; error='';
  get locationLabel():string{const l=this.auth.user?.location;return [l?.locality,l?.city].filter(Boolean).join(', ')||'Location not added';}
  ngOnInit():void{
    this.analytics.customer().subscribe({next:s=>this.stats=s,error:e=>this.error=e?.error?.message||'Customer analytics could not be loaded.'});
    const l=this.auth.user?.location;
    if(l?.latitude!=null&&l?.longitude!=null){this.nurseryService.nearby(l.latitude,l.longitude,10).subscribe({next:n=>{this.nearbyNurseries=n;this.loading=false;},error:()=>{this.error='Nearby nurseries could not be loaded.';this.loading=false;}});}else this.loading=false;
  }
  scrollToTop():void{window.scrollTo({top:0,behavior:'smooth'});}
  logout():void{this.auth.logout();}
}
