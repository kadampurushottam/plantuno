import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminShellComponent } from '../../shared/admin-shell.component';
import { AdminService, AdminPlant } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminShellComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  svc = inject(AdminService);
  items: AdminPlant[] = [];
  editing: any = null;
  form: any = {
    name: '',
    category: 'Indoor Plants',
    price: 0,
    image: '/assets/plants/monstera.svg',
    description: '',
    featured: false,
  };
  msg = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.plants().subscribe((r) => (this.items = r.items));
  }

  save() {
    const req = this.editing
      ? this.svc.updatePlant(this.editing, this.form)
      : this.svc.createPlant(this.form);

    req.subscribe({
      next: () => {
        this.msg = 'Product saved';
        this.reset();
        this.load();
      },
      error: (e) => (this.msg = e?.error?.message || 'Save failed'),
    });
  }

  edit(p: any) {
    this.editing = p._id;
    this.form = {
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
      description: p.description,
      featured: p.featured,
    };
  }

  remove(p: any) {
    if (confirm(`Delete ${p.name}?`)) {
      this.svc.deletePlant(p._id).subscribe(() => this.load());
    }
  }

  reset() {
    this.editing = null;
    this.form = {
      name: '',
      category: 'Indoor Plants',
      price: 0,
      image: '/assets/plants/monstera.svg',
      description: '',
      featured: false,
    };
  }
}