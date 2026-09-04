import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({selector:'app-ai-doctor',standalone:true,imports:[CommonModule,FormsModule,RouterLink,CustomerShellComponent],templateUrl:'./ai-doctor.component.html',styleUrl:'./ai-doctor.component.scss'})
export class AiDoctorComponent {
  private readonly notifications=inject(NotificationService); preview=''; symptoms=''; result:any=null; analyzing=false;
  onFile(e:any){const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>this.preview=String(reader.result);reader.readAsDataURL(file)}
  analyze(){this.analyzing=true;setTimeout(()=>{const s=this.symptoms.toLowerCase();this.result=s.includes('yellow')?{title:'Possible overwatering / nutrient stress',confidence:82,advice:['Check soil moisture before watering','Move to bright indirect light','Inspect leaves for pests']} : s.includes('spot')||s.includes('brown')?{title:'Possible leaf-spot stress',confidence:78,advice:['Remove severely affected leaves','Avoid wetting foliage','Improve airflow around the plant']} : {title:'General plant-care check',confidence:72,advice:['Keep a consistent watering schedule','Provide suitable light','Inspect weekly for pests']};this.analyzing=false;this.notifications.add('AI Plant Doctor report','A new plant-care diagnosis is available in this session.')},900)}
}
