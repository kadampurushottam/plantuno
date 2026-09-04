import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerShellComponent } from '../../../../shared/components/customer-shell/customer-shell.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({ selector:'app-help', standalone:true, imports:[CommonModule, CustomerShellComponent], templateUrl:'./help.component.html', styleUrl:'./help.component.scss' })
export class HelpComponent {
  readonly auth=inject(AuthService);
  query='';
  selected='All';
  message='';
  help=[{icon:'💬',title:'Chat with Support',text:'Talk to our support team for quick help.',action:'Start Chat'},{icon:'📦',title:'Order Help',text:'Report delivery, payment or product issues.',action:'Get Order Help'},{icon:'🩺',title:'Plant Care Help',text:'Ask an expert about plant health and care.',action:'Ask Expert'},{icon:'📍',title:'Location Help',text:'Update locality or find nearby nurseries.',action:'Update Location'},{icon:'❓',title:'FAQs',text:'Browse common questions and answers.',action:'View FAQs'},{icon:'☎️',title:'Call Us',text:'Request a callback from PlantUno support.',action:'Request Callback'}]
  notify(text:string):void { this.message=text; setTimeout(()=>this.message='',2200); }
}
