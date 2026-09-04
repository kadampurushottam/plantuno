import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LocationService } from '../../../core/services/location.service';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';

@Component({ selector:'app-customer-shell', standalone:true, imports:[CommonModule, RouterLink, RouterLinkActive, ProfileMenuComponent], templateUrl:'./customer-shell.component.html', styleUrl:'./customer-shell.component.scss' })
export class CustomerShellComponent {
  @Input() title=''; @Input() subtitle='';
  readonly auth=inject(AuthService); readonly cart=inject(CartService); readonly notifications=inject(NotificationService);
  readonly location=inject(LocationService);
  private readonly router=inject(Router);
  menu=[
    {label:'Home',icon:'⌂',route:'/customer/dashboard'}, {label:'Plants',icon:'🌿',route:'/customer/plants'},
    {label:'Nearby Nurseries',icon:'⌖',route:'/customer/nurseries'}, {label:'Plant Doctors',icon:'🩺',route:'/customer/plant-doctors'},
    {label:'Gardeners',icon:'👨‍🌾',route:'/customer/gardeners'}, {label:'Accessories',icon:'🪴',route:'/customer/accessories'},
    {label:'My Plants',icon:'🌱',route:'/customer/my-plants'}, {label:'Orders',icon:'🧾',route:'/customer/orders'},
    {label:'Care Reminders',icon:'⏰',route:'/customer/care-reminders'}, {label:'Offers',icon:'🏷️',route:'/customer/offers'},
    {label:'Blogs & Tips',icon:'📖',route:'/customer/blogs'}, {label:'Help & Support',icon:'?',route:'/customer/help'}
  ];
  mobileOpen=false; notificationsOpen=false;
  get locationLabel(){ const l=this.auth.user?.location; return [l?.locality,l?.city].filter(Boolean).join(', ')||'Add location'; }
  locationOpen=false; locationLoading=false; locationMessage='';
  get cartCount(){ return this.cart.count; }
  get unreadCount(){ return this.notifications.unread; }
  go(route:string){this.mobileOpen=false;this.notificationsOpen=false;this.router.navigateByUrl(route);}
  search(value:string){ const q=value.trim(); if(q) this.go('/customer/plants?search='+encodeURIComponent(q)); }
  markNotifications(){this.notifications.markAllRead();}
  toggleLocation(){ this.locationOpen=!this.locationOpen; this.locationMessage=''; }
  detectLocation(){
    this.locationLoading=true; this.locationMessage='Requesting your current location…';
    this.location.getCurrentPosition().subscribe({
      next: coords => {
        localStorage.setItem('plantuno_location', JSON.stringify(coords));
        this.locationLoading=false; this.locationMessage=`Location enabled • ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
      },
      error: () => { this.locationLoading=false; this.locationMessage='Location permission was denied. Please allow location access in your browser.'; }
    });
  }
}
