import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({selector:'app-login',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./login.component.html',styleUrl:'./login.component.scss'})
export class LoginComponent {
  private readonly auth=inject(AuthService); private readonly router=inject(Router); private readonly route=inject(ActivatedRoute);
  email=''; password=''; loading=false; error='';
  submit():void{this.error='';if(!this.email||!this.password){this.error='Please enter email and password.';return;}this.loading=true;this.auth.login({email:this.email,password:this.password}).subscribe({next:()=>{const returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');this.auth.redirectAfterAuth(returnUrl);},error:err=>{this.error=err?.error?.message||'Login failed. Please check your details.';this.loading=false;}})}
  goHome():void{this.router.navigate(['/']);}
}
