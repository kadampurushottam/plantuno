import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LocationService } from '../../../../core/services/location.service';
import { UserRole } from '../../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly locationService = inject(LocationService);

  name = '';
  email = '';
  password = '';
  phone = '';
  nurseryName = '';
  role: 'customer' | 'nursery' = 'customer';
  address = '';
  locality = '';
  city = '';
  district = '';
  state = '';
  pincode = '';
  latitude: number | null = null;
  longitude: number | null = null;
  loading = false;
  locationLoading = false;
  error = '';
  locationMessage = '';

  constructor() {
    const role = this.route.snapshot.queryParamMap.get('role');
    this.role = this.sanitizePublicRole(role);
  }

  selectRole(role: string): void {
    this.role = this.sanitizePublicRole(role);
  }

  useCurrentLocation(): void {
    this.locationLoading = true;
    this.locationMessage = '';
    this.error = '';
    this.locationService.getCurrentPosition().subscribe({
      next: coords => {
        this.latitude = Number(coords.latitude.toFixed(7));
        this.longitude = Number(coords.longitude.toFixed(7));
        this.locationLoading = false;
        this.locationMessage = 'Location captured. Please complete locality and address details.';
      },
      error: () => {
        this.locationLoading = false;
        this.error = 'Location permission was not available. Enter your locality, city and pincode manually.';
      }
    });
  }

  submit(): void {
    this.error = '';
    if (!this.name || !this.email || !this.password || !this.locality || !this.city || !this.state || !this.pincode) {
      this.error = 'Please complete your name, login details and location fields.';
      return;
    }
    if (this.role === 'nursery' && (!this.nurseryName || this.latitude === null || this.longitude === null)) {
      this.error = 'Nursery registration requires a nursery name and current location.';
      return;
    }

    this.loading = true;
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      nurseryName: this.nurseryName,
      phone: this.phone,
      location: {
        address: this.address,
        locality: this.locality,
        city: this.city,
        district: this.district,
        state: this.state,
        pincode: this.pincode,
        latitude: this.latitude,
        longitude: this.longitude
      }
    }).subscribe({
      next: response => this.auth.redirectByRole(response.user.role),
      error: err => {
        this.error = err?.error?.message || 'Registration failed.';
        this.loading = false;
      }
    });
  }

  private sanitizePublicRole(role: string | null | undefined): 'customer' | 'nursery' {
    return role === 'nursery' ? 'nursery' : 'customer';
  }
}
