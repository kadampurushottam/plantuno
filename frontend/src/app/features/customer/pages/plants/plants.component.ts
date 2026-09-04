import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';
import { PlantService } from '../../../../core/services/plant.service';
import { CartService } from '../../../../core/services/cart.service';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { Plant } from '../../../../core/models/plant.model';

@Component({ selector:'app-plants', standalone:true, imports:[CommonModule,FormsModule,RouterLink,CustomerShellComponent], templateUrl:'./plants.component.html', styleUrl:'./plants.component.scss' })
export class PlantsComponent implements OnInit {
  readonly auth=inject(AuthService); readonly cart=inject(CartService); readonly wishlist=inject(WishlistService);
  private readonly plantsApi=inject(PlantService); private readonly route=inject(ActivatedRoute);
  query=''; selected='All'; sort='featured'; loading=true; message=''; error='';
  categories=['All','Indoor Plants','Outdoor Plants','Flowering Plants','Foliage Plants','Cactus','Orchid','Succulents','Medicinal Plants','Fruit Plants'];
  plants:Plant[]=[];
  private fallback:Plant[]=[
    {_id:'demo-snake',name:'Snake Plant',category:'Indoor Plants',price:499,description:'Low care, air purifying plant.',image:'assets/plants/snake.svg',light:'Indirect light',water:'Weekly',difficulty:'Easy',featured:true},
    {_id:'demo-peace',name:'Peace Lily',category:'Flowering Plants',price:399,description:'Elegant flowering indoor plant.',image:'assets/plants/peace-lily.svg',light:'Medium light',water:'Twice weekly',difficulty:'Easy',featured:true},
    {_id:'demo-areca',name:'Areca Palm',category:'Indoor Plants',price:799,description:'Fresh tropical look for your home.',image:'assets/plants/areca.svg',light:'Bright indirect',water:'2-3 times weekly',difficulty:'Medium',featured:true},
    {_id:'demo-zz',name:'ZZ Plant',category:'Foliage Plants',price:499,description:'Hardy plant for busy plant lovers.',image:'assets/plants/jade.svg',light:'Low to bright',water:'Every 10 days',difficulty:'Easy',featured:true},
    {_id:'demo-money',name:'Money Plant',category:'Indoor Plants',price:199,description:'Classic easy-care green friend.',image:'assets/plants/money.svg',light:'Indirect light',water:'Weekly',difficulty:'Easy',featured:true}
  ];
  ngOnInit(){this.route.queryParamMap.subscribe(p=>{this.query=p.get('search')||'';this.load();});}
  load(){this.loading=true;this.error='';this.plantsApi.search(this.query,this.selected).subscribe({next:r=>{this.plants=r.items?.length?r.items:this.fallback.filter(p=>this.matches(p));this.loading=false;},error:()=>{this.plants=this.fallback.filter(p=>this.matches(p));this.loading=false;this.error='Showing demo catalogue while the marketplace API is unavailable.';}});}
  matches(p:Plant){return (this.selected==='All'||p.category.toLowerCase()===this.selected.toLowerCase())&&(!this.query||`${p.name} ${p.category} ${p.description||''} ${p.light||''}`.toLowerCase().includes(this.query.toLowerCase()));}
  setCategory(c:string){this.selected=c;this.load();}
  get visible(){const list=[...this.plants]; if(this.sort==='priceLow')list.sort((a,b)=>a.price-b.price); if(this.sort==='priceHigh')list.sort((a,b)=>b.price-a.price); if(this.sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name)); return list;}
  add(p:Plant){if(p._id.startsWith('demo-')){this.message='Demo plant: connect it to a nursery product to purchase.';setTimeout(()=>this.message='',2200);return;}this.cart.add(p);this.message=`${p.name} added to cart`;setTimeout(()=>this.message='',1800);}
  buy(p:Plant){if(p._id.startsWith('demo-')){this.message='Demo catalogue item selected.';setTimeout(()=>this.message='',1800);return;}this.cart.setPendingBuy(p);location.href='/checkout';}
  toggleWishlist(p:Plant){const added=this.wishlist.toggle(p);this.message=added?`${p.name} saved to wishlist`:`${p.name} removed from wishlist`;setTimeout(()=>this.message='',1800);}
}
