import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';
import { NurseryLocation, NurseryService } from '../../../../core/services/nursery.service';
import { LocationService } from '../../../../core/services/location.service';

@Component({ selector:'app-nurseries', standalone:true, imports:[CommonModule,FormsModule,CustomerShellComponent], templateUrl:'./nurseries.component.html', styleUrl:'./nurseries.component.scss' })
export class NurseriesComponent implements OnInit {
  readonly auth=inject(AuthService); private readonly api=inject(NurseryService); private readonly location=inject(LocationService);
  query=''; message=''; loading=true; nurseries:NurseryLocation[]=[];
  ngOnInit(){this.loadFromSavedLocation()}
  loadFromSavedLocation(){const l=this.auth.user?.location;if(l?.latitude!=null&&l?.longitude!=null)this.load(l.latitude,l.longitude);else {this.loading=false;}}
  load(lat:number,lon:number){this.loading=true;this.api.nearby(lat,lon,15).subscribe({next:r=>{this.nurseries=r;this.loading=false},error:()=>{this.loading=false;this.message='Unable to load nearby nurseries'}})}
  detect(){this.location.getCurrentPosition().subscribe({next:c=>{this.message='Location detected';this.load(c.latitude,c.longitude)},error:()=>this.message='Please allow browser location access'})}
  get visible(){return this.nurseries.filter(n=>!this.query||n.name.toLowerCase().includes(this.query.toLowerCase())||n.locality?.toLowerCase().includes(this.query.toLowerCase()))}
}
