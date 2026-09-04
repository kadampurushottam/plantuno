import {Component,inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router,RouterLink,RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {ProfileMenuComponent} from '../../../shared/components/profile-menu/profile-menu.component';
@Component({selector:'app-admin-shell',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,ProfileMenuComponent],templateUrl:'./admin-shell.component.html',styleUrl:'./admin-shell.component.scss'})
export class AdminShellComponent{
 auth=inject(AuthService); router=inject(Router); open=false;
 links=[['Dashboard','/admin/dashboard','▦'],['Users','/admin/users','♙'],['Nurseries','/admin/nurseries','⌂'],['Products','/admin/products','♧'],['Orders','/admin/orders','▤'],['Plant Doctors','/admin/plant-doctors','⚕'],['Gardeners','/admin/gardeners','♟'],['Appointments','/admin/appointments','◷'],['Blogs & CMS','/admin/blogs','✎'],['Coupons','/admin/coupons','%'],['Reports','/admin/reports','◔'],['Support Tickets','/admin/support','?'],['Settings','/admin/settings','⚙']];

}
