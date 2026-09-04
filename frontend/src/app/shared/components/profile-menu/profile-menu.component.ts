import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  open = false;

  get role(): string { return this.auth.user?.role || 'customer'; }
  get settingsRoute(): string {
    return this.role === 'admin' ? '/admin/settings' : this.role === 'nursery' ? '/nursery/settings' : '/customer/dashboard';
  }
  get profileLabel(): string { return this.role === 'admin' ? 'Admin Profile' : this.role === 'nursery' ? 'Nursery Profile' : 'My Profile'; }
  get displayName(): string { return this.auth.user?.name || (this.role === 'admin' ? 'Admin' : this.role === 'nursery' ? 'Nursery' : 'User'); }
  get initial(): string { return this.displayName.charAt(0).toUpperCase(); }

  toggle(event: Event): void { event.stopPropagation(); this.open = !this.open; }
  navigate(route: string): void { this.open = false; this.router.navigateByUrl(route); }
  logout(): void { this.open = false; this.auth.logout(); }

  @HostListener('document:click') close(): void { this.open = false; }
}
