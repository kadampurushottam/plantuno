import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({ selector:'app-wishlist', standalone:true, imports:[CommonModule, RouterLink, CustomerShellComponent], templateUrl:'./wishlist.component.html', styleUrl:'./wishlist.component.scss' })
export class WishlistComponent {
  readonly wishlist=inject(WishlistService); readonly cart=inject(CartService); message='';
  get items(){ return this.wishlist.items; }
  add(item:any){ this.cart.add(item); this.message=`${item.name} added to cart`; setTimeout(()=>this.message='',1800); }
  remove(id:string){ this.wishlist.remove(id); }
}
