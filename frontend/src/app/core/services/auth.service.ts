import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse, AuthUser, UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly api = 'https://plantuno-backend.vercel.app/api/auth';

  get user(): AuthUser | null {
    const raw = localStorage.getItem('plantuno_user');
    try { return raw ? JSON.parse(raw) as AuthUser : null; } catch { return null; }
  }

  get token(): string | null { return localStorage.getItem('plantuno_token'); }
  get isLoggedIn(): boolean { return !!this.token && !!this.user; }

  register(payload: { name: string; email: string; password: string; role: UserRole; nurseryName?: string; phone?: string; location?: Record<string, unknown> }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, payload).pipe(tap(response => this.store(response)));
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, payload).pipe(tap(response => this.store(response)));
  }

  logout(): void {
    localStorage.removeItem('plantuno_token');
    localStorage.removeItem('plantuno_user');
    this.router.navigate(['/']);
  }

  redirectByRole(role: UserRole): void {
    const routes: Record<UserRole, string> = {
      customer: '/customer/dashboard', nursery: '/nursery/dashboard', admin: '/admin/dashboard'
    };
    this.router.navigateByUrl(routes[role]);
  }

  redirectAfterAuth(returnUrl: string | null): void {
    if (returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//')) {
      this.router.navigateByUrl(returnUrl);
      return;
    }
    const role = this.user?.role;
    if (role) this.redirectByRole(role);
    else this.router.navigate(['/']);
  }

  private store(response: AuthResponse): void {
    localStorage.setItem('plantuno_token', response.token);
    localStorage.setItem('plantuno_user', JSON.stringify(response.user));
  }
}
