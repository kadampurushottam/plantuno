import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NurseryLocation, NurseryService } from '../../../../core/services/nursery.service';
import { AnalyticsService, NurseryStats } from '../../../../core/services/analytics.service';
import { NurseryShellComponent } from '../../shared/nursery-shell.component';

@Component({
  selector:'app-nursery-dashboard',
  standalone:true,
  imports:[CommonModule,RouterLink,NurseryShellComponent],
  templateUrl:'./dashboard.component.html',
  styleUrls:['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  readonly auth=inject(AuthService);
  private readonly nurseryService=inject(NurseryService);
  private readonly analytics=inject(AnalyticsService);
  nursery:NurseryLocation|null=null;
  stats:NurseryStats={revenue:0,orders:0,unitsSold:0,inventory:0,rating:0,revenueByDay:[],recentOrders:[]};
  loading=true;error='';
  ngOnInit(){
    this.nurseryService.mine().subscribe({next:n=>{this.nursery=n;this.loading=false;},error:e=>{this.error=e?.error?.message||'Nursery profile could not be loaded.';this.loading=false;}});
    this.analytics.nursery().subscribe({next:s=>this.stats=s,error:e=>this.error=e?.error?.message||'Sales analytics could not be loaded.'});
  }
  maxRevenue(){return Math.max(...this.stats.revenueByDay.map(x=>x.value),1);}
  barHeight(value:number){return `${Math.max(8,Math.round(value/this.maxRevenue()*100))}%`;}
}
