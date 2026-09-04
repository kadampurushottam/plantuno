import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector: 'app-care-reminders', standalone: true, imports: [CommonModule, CustomerShellComponent], templateUrl: './care-reminders.component.html', styleUrl: './care-reminders.component.scss' })
export class CareRemindersComponent {
  readonly auth = inject(AuthService);
  query = '';
  selected = 'All';
  message = '';
  reminders = [{ icon: '💧', title: 'Water your Monstera', plant: 'Monstera Deliciosa', when: 'Today · 7:00 PM' }, { icon: '🌱', title: 'Add organic fertilizer', plant: 'Peace Lily', when: 'Tomorrow · 8:00 AM' }, { icon: '🪴', title: 'Repot your Aloe Vera', plant: 'Aloe Vera', when: 'Friday · 10:00 AM' }, { icon: '☀️', title: 'Move plant to bright light', plant: 'Snake Plant', when: 'Saturday · 9:00 AM' }]
  notify(text: string): void { this.message = text; setTimeout(() => this.message = '', 2200); }
}
