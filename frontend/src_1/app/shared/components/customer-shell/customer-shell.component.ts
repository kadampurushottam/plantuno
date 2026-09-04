import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './customer-shell.component.html',
  styleUrl: './customer-shell.component.scss'
})
export class CustomerShellComponent {
  @Input() title = '';
  @Input() subtitle = '';
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  menu = [
    { label: 'Home', icon: '⌂', route: '/customer/dashboard' },
    { label: 'Plants', icon: '🌿', route: '/customer/plants' },
    { label: 'Nearby Nurseries', icon: '⌖', route: '/customer/nurseries' },
    { label: 'Plant Doctors', icon: '🩺', route: '/customer/plant-doctors' },
    { label: 'Gardeners', icon: '👨‍🌾', route: '/customer/gardeners' },
    { label: 'Accessories', icon: '🪴', route: '/customer/accessories' },
    { label: 'My Plants', icon: '🌱', route: '/customer/my-plants' },
    { label: 'Orders', icon: '🧾', route: '/customer/orders' },
    { label: 'Care Reminders', icon: '⏰', route: '/customer/care-reminders' },
    { label: 'Offers', icon: '🏷️', route: '/customer/offers' },
    { label: 'Blogs & Tips', icon: '📖', route: '/customer/blogs' },
    { label: 'Help & Support', icon: '?', route: '/customer/help' }
  ];
  mobileOpen = false;
  get locationLabel(): string {
    const l = this.auth.user?.location;
    return [l?.locality, l?.city].filter(Boolean).join(', ') || 'Add location';
  }
  logout(): void { this.auth.logout(); }
  go(route: string): void { this.mobileOpen = false; this.router.navigateByUrl(route); }
}
