import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({selector:'app-navbar',standalone:true,imports:[CommonModule,RouterLink],templateUrl:'./navbar.component.html',styleUrl:'./navbar.component.scss'})
export class NavbarComponent{
  readonly auth=inject(AuthService);private readonly router=inject(Router);private readonly cart=inject(CartService);
  get cartCount():number{return this.cart.count;}
  get locationLabel():string{const l=this.auth.user?.location;return [l?.city,l?.state].filter(Boolean).join(', ')||'Pune, Maharashtra';}
  goHome():void{this.router.navigate(['/']);}
  goCart():void{this.router.navigate(['/checkout']);}
  goDashboard():void{const role=this.auth.user?.role;if(role)this.auth.redirectByRole(role);}
}
