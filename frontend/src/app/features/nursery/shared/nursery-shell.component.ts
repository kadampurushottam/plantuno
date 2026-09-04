import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileMenuComponent } from '../../../shared/components/profile-menu/profile-menu.component';

@Component({
  selector:'app-nursery-shell',
  standalone:true,
  imports:[CommonModule,RouterLink,RouterLinkActive,ProfileMenuComponent],
  templateUrl:'./nursery-shell.component.html',
  styleUrls:['./nursery-shell.component.scss']
})
export class NurseryShellComponent {
  @Input() title='';
  @Input() subtitle='';
  readonly auth=inject(AuthService);
  private readonly router=inject(Router);
  mobileOpen=false;

  menu=[
    ['Dashboard','/nursery/dashboard','⌂'],
    ['Plants & Inventory','/nursery/inventory','🌿'],
    ['Orders','/nursery/orders','🧾'],
    ['Customers','/nursery/customers','👥'],
    ['Revenue','/nursery/revenue','₹'],
    ['Delivery','/nursery/delivery','🚚'],
    ['Offers','/nursery/offers','🏷️'],
    ['Reviews','/nursery/reviews','⭐'],
    ['Reports','/nursery/reports','📊'],
    ['Settings','/nursery/settings','⚙️']
  ];

  go(route:string){ this.mobileOpen=false; this.router.navigateByUrl(route); }
}
