import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({selector:'app-checkout',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./checkout.component.html',styleUrl:'./checkout.component.scss'})
export class CheckoutComponent {
  readonly cart=inject(CartService); readonly auth=inject(AuthService); private readonly http=inject(HttpClient); private readonly router=inject(Router); private readonly notifications=inject(NotificationService);
  items:CartItem[]=[]; submitting=false; success=''; error=''; orderId=''; couponCode=''; couponMessage=''; paymentMethod='COD';
  address={fullName:'',phone:'',address:'',city:'Pune',state:'Maharashtra',pincode:''};
  constructor(){const pending=this.cart.consumePendingBuy();if(pending)this.cart.add(pending);const u=this.auth.user;this.address.fullName=u?.name||'';this.refresh();}
  refresh(){this.items=this.cart.items;}
  change(i:CartItem,d:number){this.cart.updateQuantity(i.plantId,i.quantity+d);this.refresh()}
  remove(i:CartItem){this.cart.remove(i.plantId);this.refresh()}
  get subtotal(){return this.cart.total}
  get discount(){return this.couponCode.trim().toUpperCase()==='GREEN10'?Math.round(this.subtotal*.1):0}
  get deliveryFee(){return this.subtotal>=999?0:49}
  get grandTotal(){return Math.max(0,this.subtotal-this.discount+this.deliveryFee)}
  applyCoupon(){const code=this.couponCode.trim().toUpperCase();this.couponMessage=code==='GREEN10'?'10% discount applied':'Invalid coupon. Try GREEN10';}
  placeOrder(){
    if(!this.items.length)return; if(!this.address.fullName||!this.address.phone||!this.address.address||!this.address.pincode){this.error='Please complete your delivery address.';return;}
    this.submitting=true;this.error='';this.success='';
    this.http.post<any>('https://plantuno-backend.vercel.app/api/orders',{items:this.items.map(i=>({plantId:i.plantId,quantity:i.quantity})),address:this.address,couponCode:this.couponCode,paymentMethod:this.paymentMethod}).subscribe({next:r=>{this.orderId=r.order._id;this.success='Order placed successfully!';this.notifications.add('Order placed',`Order #${this.orderId.slice(-6)} has been created.`);this.cart.clear();this.refresh();this.submitting=false;},error:e=>{this.error=e?.error?.message||'Unable to create order. Please try again.';this.submitting=false;}})
  }
  goOrders(){this.router.navigateByUrl('/customer/orders')}
}
