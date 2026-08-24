import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../../core/services/cart.service';

@Component({selector:'app-checkout',standalone:true,imports:[CommonModule,RouterLink],templateUrl:'./checkout.component.html',styleUrl:'./checkout.component.scss'})
export class CheckoutComponent {
  readonly cart=inject(CartService); private readonly http=inject(HttpClient);
  items:CartItem[]=[]; submitting=false; success=''; error=''; orderId='';
  constructor(){const pending=this.cart.consumePendingBuy();if(pending)this.cart.add(pending);this.refresh();}
  refresh():void{this.items=this.cart.items;}
  change(item:CartItem,delta:number):void{this.cart.updateQuantity(item.plantId,item.quantity+delta);this.refresh();}
  remove(item:CartItem):void{this.cart.remove(item.plantId);this.refresh();}
  placeOrder():void{if(!this.items.length)return;this.submitting=true;this.success='';this.error='';this.http.post<any>('http://localhost:5000/api/orders',{items:this.items.map(i=>({plantId:i.plantId,quantity:i.quantity})),}).subscribe({next:r=>{this.orderId=r.order._id;this.success='Order placed successfully!';this.cart.clear();this.refresh();this.submitting=false;},error:e=>{this.error=e?.error?.message||'Unable to place order. Please try again.';this.submitting=false;}})}
}
