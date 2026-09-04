import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';
import { NurseryLocation, NurseryService } from '../../../../core/services/nursery.service';
import { AnalyticsService, CustomerStats } from '../../../../core/services/analytics.service';
import { PlantService } from '../../../../core/services/plant.service';
import { CartService } from '../../../../core/services/cart.service';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { Plant } from '../../../../core/models/plant.model';

@Component({selector:'app-customer-dashboard',standalone:true,imports:[CommonModule,RouterLink,CustomerShellComponent],templateUrl:'./dashboard.component.html',styleUrl:'./dashboard.component.scss'})
export class DashboardComponent implements OnInit {
  readonly auth=inject(AuthService); readonly cart=inject(CartService); readonly wishlist=inject(WishlistService);
  private readonly nurseryService=inject(NurseryService); private readonly analytics=inject(AnalyticsService); private readonly plantsApi=inject(PlantService);
  nearbyNurseries:NurseryLocation[]=[]; stats:CustomerStats={orders:0,totalSpent:0,plantsBought:0,activeOrders:0,recentOrders:[]}; plants:Plant[]=[]; loading=true;
  get locationLabel(){const l=this.auth.user?.location;return [l?.locality,l?.city].filter(Boolean).join(', ')||'Add location';}
  ngOnInit(){this.analytics.customer().subscribe({next:s=>this.stats=s,error:()=>{}});this.plantsApi.search('', 'All').subscribe({next:r=>{this.plants=r.items.slice(0,5);this.loading=false},error:()=>this.loading=false});const l=this.auth.user?.location;if(l?.latitude!=null&&l?.longitude!=null)this.nurseryService.nearby(l.latitude,l.longitude,10).subscribe({next:n=>this.nearbyNurseries=n,error:()=>{}})}
  add(p:Plant){this.cart.add(p)}
  save(p:Plant){this.wishlist.toggle(p)}
}
