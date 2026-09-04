import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NurseryShellComponent } from '../../shared/nursery-shell.component';
import { PlantService } from '../../../../core/services/plant.service';
import { Plant } from '../../../../core/models/plant.model';

@Component({
  selector:'app-nursery-inventory',
  standalone:true,
  imports:[CommonModule,FormsModule,NurseryShellComponent],
  templateUrl:'./inventory.component.html',
  styleUrls:['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  private readonly plantService=inject(PlantService);
  items:Plant[]=[];
  q='';
  loading=false;
  saving=false;
  showForm=false;
  message='';
  error='';
  photoPreview='';
  form={name:'',category:'Indoor',price:0,description:'',light:'Bright indirect',water:'Moderate',difficulty:'Easy',featured:false};

  ngOnInit(){ this.load(); }

  load(){
    this.loading=true; this.error='';
    this.plantService.mine().subscribe({
      next:r=>{this.items=r.items||[];this.loading=false;},
      error:e=>{this.error=e?.error?.message||'Unable to load your plants.';this.loading=false;}
    });
  }

  get featuredCount():number{return this.items.filter(p=>p.featured).length;}
  get averagePrice():number{return this.items.length ? Math.round(this.items.reduce((sum,p)=>sum+Number(p.price||0),0)/this.items.length) : 0;}

  get filtered():Plant[]{
    const q=this.q.trim().toLowerCase();
    return !q ? this.items : this.items.filter(p=>[p.name,p.category,p.description].some(v=>String(v||'').toLowerCase().includes(q)));
  }

  openAdd(){this.showForm=true;this.error='';this.message='';}
  closeAdd(){if(!this.saving){this.showForm=false;this.reset();}}

  onPhoto(event:Event){
    const input=event.target as HTMLInputElement;
    const file=input.files?.[0];
    if(!file) return;
    if(!file.type.startsWith('image/')){this.error='Please select an image file.';return;}
    if(file.size>3_000_000){this.error='Photo must be smaller than 3 MB.';return;}
    const reader=new FileReader();
    reader.onload=()=>this.photoPreview=String(reader.result||'');
    reader.readAsDataURL(file);
  }

  save(){
    if(!this.form.name.trim()){this.error='Plant name is required.';return;}
    if(this.form.price<0){this.error='Price cannot be negative.';return;}
    this.saving=true;this.error='';
    this.plantService.create({...this.form,name:this.form.name.trim(),image:this.photoPreview}).subscribe({
      next:p=>{this.items=[p,...this.items];this.message='Plant added successfully and is now in your nursery inventory.';this.saving=false;this.showForm=false;this.reset();},
      error:e=>{this.error=e?.error?.message||'Unable to add plant.';this.saving=false;}
    });
  }

  reset(){this.form={name:'',category:'Indoor',price:0,description:'',light:'Bright indirect',water:'Moderate',difficulty:'Easy',featured:false};this.photoPreview='';}
}
