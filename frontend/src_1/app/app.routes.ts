import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/guards/auth.guard';
import { LandingComponent } from './features/guest/pages/landing/landing.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { CheckoutComponent } from './features/checkout/pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'customer/dashboard', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/dashboard/dashboard.component').then(m=>m.DashboardComponent) },

  { path: 'customer/plants', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/plants/plants.component').then(m=>m.PlantsComponent) },
  { path: 'customer/nurseries', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/nurseries/nurseries.component').then(m=>m.NurseriesComponent) },
  { path: 'customer/plant-doctors', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/plant-doctors/plant-doctors.component').then(m=>m.PlantDoctorsComponent) },
  { path: 'customer/gardeners', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/gardeners/gardeners.component').then(m=>m.GardenersComponent) },
  { path: 'customer/accessories', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/accessories/accessories.component').then(m=>m.AccessoriesComponent) },
  { path: 'customer/my-plants', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/my-plants/my-plants.component').then(m=>m.MyPlantsComponent) },
  { path: 'customer/orders', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/orders/orders.component').then(m=>m.OrdersComponent) },
  { path: 'customer/care-reminders', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/care-reminders/care-reminders.component').then(m=>m.CareRemindersComponent) },
  { path: 'customer/offers', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/offers/offers.component').then(m=>m.OffersComponent) },
  { path: 'customer/blogs', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/blogs/blogs.component').then(m=>m.BlogsComponent) },
  { path: 'customer/help', canActivate:[authGuard,roleGuard], data:{roles:['customer']}, loadComponent:()=>import('./features/customer/pages/help/help.component').then(m=>m.HelpComponent) },
  { path: 'nursery/dashboard', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/dashboard/dashboard.component').then(m=>m.DashboardComponent) },
  { path: 'nursery/inventory', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/inventory/inventory.component').then(m=>m.InventoryComponent) },
  { path: 'nursery/orders', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/orders/orders.component').then(m=>m.OrdersComponent) },
  { path: 'nursery/customers', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/customers/customers.component').then(m=>m.CustomersComponent) },
  { path: 'nursery/revenue', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/revenue/revenue.component').then(m=>m.RevenueComponent) },
  { path: 'nursery/delivery', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/delivery/delivery.component').then(m=>m.DeliveryComponent) },
  { path: 'nursery/offers', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/offers/offers.component').then(m=>m.OffersComponent) },
  { path: 'nursery/reviews', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/reviews/reviews.component').then(m=>m.ReviewsComponent) },
  { path: 'nursery/reports', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/reports/reports.component').then(m=>m.ReportsComponent) },
  { path: 'nursery/settings', canActivate:[authGuard,roleGuard], data:{roles:['nursery']}, loadComponent:()=>import('./features/nursery/pages/settings/settings.component').then(m=>m.SettingsComponent) },

  { path:'admin/admin-users', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/admin-users/admin-users.component').then(m=>m.AdminUsersComponent) },
  { path:'admin/users', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/users/users.component').then(m=>m.UsersComponent) },
  { path:'admin/nurseries', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/nurseries/nurseries.component').then(m=>m.NurseriesComponent) },
  { path:'admin/products', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/products/products.component').then(m=>m.ProductsComponent) },
  { path:'admin/orders', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/orders/orders.component').then(m=>m.OrdersComponent) },
  { path:'admin/plant-doctors', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/plant-doctors/plant-doctors.component').then(m=>m.PlantDoctorsComponent) },
  { path:'admin/gardeners', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/gardeners/gardeners.component').then(m=>m.GardenersComponent) },
  { path:'admin/appointments', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/appointments/appointments.component').then(m=>m.AppointmentsComponent) },
  { path:'admin/blogs', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/blogs/blogs.component').then(m=>m.BlogsComponent) },
  { path:'admin/coupons', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/coupons/coupons.component').then(m=>m.CouponsComponent) },
  { path:'admin/reports', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/reports/reports.component').then(m=>m.ReportsComponent) },
  { path:'admin/support', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/support/support.component').then(m=>m.SupportComponent) },
  { path:'admin/settings', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/settings/settings.component').then(m=>m.SettingsComponent) },
  { path: 'admin/dashboard', canActivate:[authGuard,roleGuard], data:{roles:['admin']}, loadComponent:()=>import('./features/admin/pages/dashboard/dashboard.component').then(m=>m.DashboardComponent) },
  { path: '**', redirectTo: '' }
];
