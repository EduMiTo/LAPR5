import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
  if (localStorage.getItem('token') != null) {
    let roles = next.data['permitedRoles'] as Array<string>;
    if (roles) {
      if (this.authenticationService.roleMatch(roles)) return true;
      else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    return true;
  }
  else {
    this.router.navigate(['/login']);
    return false;
  }


    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
}
