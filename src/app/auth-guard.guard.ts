import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{
  constructor(private authService: AuthGuardService, private router: Router){}
  
  canActivate(): MaybeAsync<GuardResult> {
    if(this.authService.verificarLogin()){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
}
