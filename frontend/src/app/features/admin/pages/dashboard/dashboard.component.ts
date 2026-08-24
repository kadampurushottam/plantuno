import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminShellComponent } from '../../shared/admin-shell.component';
import { AuthService } from '../../../../core/services/auth.service';
import { AnalyticsService, AdminStats } from '../../../../core/services/analytics.service';

@Component({selector:'app-admin-dashboard',standalone:true,imports:[CommonModule,RouterLink,AdminShellComponent],templateUrl:'./dashboard.component.html',styleUrl:'./dashboard.component.scss'})
export class DashboardComponent implements OnInit{
  readonly auth=inject(AuthService); private readonly analytics=inject(AnalyticsService);
  loading=true;error='';
  stats:AdminStats={revenue:0,orders:0,customers:0,nurseries:0,plants:0,unitsSold:0,revenueByMonth:[],orderStatus:[],recentOrders:[]};

  ngOnInit():void{
    this.analytics.admin().subscribe({next:s=>{this.stats=s;this.loading=false;},error:e=>{this.error=e?.error?.message||'Analytics could not be loaded.';this.loading=false;}});
  }
  maxRevenue():number{return Math.max(...this.stats.revenueByMonth.map(x=>x.value),1);}
  barHeight(value:number):string{return `${Math.max(7,Math.round(value/this.maxRevenue()*100))}%`;}
  maxStatus():number{return Math.max(...this.stats.orderStatus.map(x=>x.value),1);}
  statusWidth(value:number):string{return `${Math.max(5,Math.round(value/this.maxStatus()*100))}%`;}
  statusClass(status:string):string{return status.toLowerCase();}
  logout():void{this.auth.logout();}

  exportReport():void{
    const rows=[['Metric','Value'],['Revenue',String(this.stats.revenue)],['Orders',String(this.stats.orders)],['Customers',String(this.stats.customers)],['Nurseries',String(this.stats.nurseries)],['Plants',String(this.stats.plants)],['Units Sold',String(this.stats.unitsSold)]];
    rows.push([],['Recent Orders']);
    rows.push(['Order','Amount','Status','Date']);
    this.stats.recentOrders.forEach(o=>rows.push([`#${String(o.id).slice(-6)}`,String(o.total),o.status,new Date(o.createdAt).toLocaleDateString('en-IN')]));
    const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`plantuno-admin-report-${new Date().toISOString().slice(0,10)}.csv`;a.click();URL.revokeObjectURL(url);
  }
}
