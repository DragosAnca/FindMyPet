import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}
  canActivate(): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }

    return true;
  }

}
