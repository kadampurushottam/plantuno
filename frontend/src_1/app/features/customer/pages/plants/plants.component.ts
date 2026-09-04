import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-plants', standalone:true, imports:[CommonModule, FormsModule, CustomerShellComponent], templateUrl:'./plants.component.html', styleUrl:'./plants.component.scss' })
export class PlantsComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  categories=['All','Indoor','Outdoor','Flowering','Medicinal']; plants=[{name:'Snake Plant',category:'Indoor',price:499,description:'Low care, air purifying plant.',image:'/assets/plants/snake.svg'},{name:'Peace Lily',category:'Flowering',price:399,description:'Elegant flowering indoor plant.',image:'/assets/plants/peace-lily.svg'},{name:'Areca Palm',category:'Indoor',price:799,description:'Fresh tropical look for your home.',image:'/assets/plants/areca.svg'},{name:'ZZ Plant',category:'Outdoor',price:499,description:'Hardy plant for busy plant lovers.',image:'/assets/plants/jade.svg'},{name:'Money Plant',category:'Indoor',price:199,description:'Classic easy-care green friend.',image:'/assets/plants/money.svg'}]; filteredPlants(){return this.plants.filter((p:any)=>(this.selected==='All'||p.category===this.selected)&&p.name.toLowerCase().includes(this.query.toLowerCase()));}
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
