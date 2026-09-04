import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector: 'app-accessories', standalone: true, imports: [CommonModule, CustomerShellComponent], templateUrl: './accessories.component.html', styleUrl: './accessories.component.scss' })
export class AccessoriesComponent {
  readonly auth = inject(AuthService);
  query = '';
  selected = 'All';
  message = '';
  accessories = [{ name: 'Ceramic Planter', description: 'Premium indoor pot', price: 349, icon: '🏺' }, { name: 'Organic Fertilizer', description: 'Natural plant nutrition', price: 249, icon: '🌾' }, { name: 'Watering Can', description: '1.5 litre garden can', price: 199, icon: '🚿' }, { name: 'Garden Tool Kit', description: '5-piece starter kit', price: 599, icon: '🧰' }]
  notify(text: string): void { this.message = text; setTimeout(() => this.message = '', 2200); }
}
