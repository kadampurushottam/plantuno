import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { PlantService } from '../../../../core/services/plant.service';
import { CartService } from '../../../../core/services/cart.service';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { Plant } from '../../../../core/models/plant.model';

@Component({selector:'app-plant-detail',standalone:true,imports:[CommonModule,RouterLink,CustomerShellComponent],templateUrl:'./plant-detail.component.html',styleUrl:'./plant-detail.component.scss'})
export class PlantDetailComponent implements OnInit {
  private readonly route=inject(ActivatedRoute); private readonly api=inject(PlantService); readonly cart=inject(CartService); readonly wishlist=inject(WishlistService);
  plant:Plant|null=null; loading=true; error=''; message=''; quantity=1;
  ngOnInit(){const id=this.route.snapshot.paramMap.get('id')||'';this.api.getById(id).subscribe({next:p=>{this.plant=p;this.loading=false;},error:e=>{this.error=e?.error?.message||'Plant details could not be loaded.';this.loading=false;}})}
  add(){if(!this.plant)return;this.cart.add(this.plant,this.quantity);this.message='Added to cart';setTimeout(()=>this.message='',1800)}
  buy(){if(!this.plant)return;this.cart.setPendingBuy(this.plant);location.href='/checkout'}
  decrementQuantity(){this.quantity=Math.max(1,this.quantity-1)}
  incrementQuantity(){this.quantity+=1}
  toggle(){if(!this.plant)return;this.wishlist.toggle(this.plant)}
}
