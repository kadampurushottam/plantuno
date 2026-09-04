import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth=inject(AuthService); const router=inject(Router);
  return auth.isLoggedIn ? true : router.createUrlTree(['/login'], { queryParams:{returnUrl:route.url.map(x=>x.path).join('/')} });
};
export const roleGuard: CanActivateFn = (route) => {
  const auth=inject(AuthService); const router=inject(Router); const allowed=route.data['roles'] as string[];
  return auth.user && allowed.includes(auth.user.role) ? true : router.createUrlTree(['/']);
};
