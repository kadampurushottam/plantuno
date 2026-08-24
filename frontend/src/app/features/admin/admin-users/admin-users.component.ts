import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  admins: any[] = [];
  loading = false;
  error = '';
  newAdmin = { name: '', email: '', mobile: '', password: '', isSuperAdmin: false };

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.http.get<any[]>('/api/admin/admin-users').subscribe({
      next: data => { this.admins = data; this.loading = false; },
      error: err => { this.error = err?.error?.message || 'Unable to load admin users.'; this.loading = false; }
    });
  }

  create(): void {
    this.error = '';
    this.http.post('/api/admin/admin-users', this.newAdmin).subscribe({
      next: () => {
        this.newAdmin = { name: '', email: '', mobile: '', password: '', isSuperAdmin: false };
        this.load();
      },
      error: err => this.error = err?.error?.message || 'Unable to create admin.'
    });
  }

  toggle(admin: any): void {
    this.http.patch(`/api/admin/admin-users/${admin._id || admin.id}/status`, {
      isActive: !admin.isActive
    }).subscribe({ next: () => this.load(), error: err => this.error = err?.error?.message || 'Unable to update admin.' });
  }
}
