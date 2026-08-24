import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-blogs', standalone:true, imports:[CommonModule, CustomerShellComponent], templateUrl:'./blogs.component.html', styleUrl:'./blogs.component.scss' })
export class BlogsComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  blogs=[{icon:'🪴',category:'Indoor Plants',title:'Best Indoor Plants for Clean Air',excerpt:'Easy plants that make apartments feel fresher.'},{icon:'🌿',category:'Plant Care',title:'Summer Plant Care Tips',excerpt:'Watering, light and heat protection made simple.'},{icon:'🌱',category:'Gardening',title:'How to Start a Balcony Garden',excerpt:'A simple plan for your first productive green corner.'},{icon:'🐛',category:'Plant Health',title:'Common Pests and How to Treat Them',excerpt:'Identify common pests before they spread.'}]
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
