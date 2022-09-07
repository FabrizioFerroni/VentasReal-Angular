import { ApiAuthService } from './../services/api-auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(
    private router: Router,
    private authServ: ApiAuthService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    const user = this.authServ.usuarioData;
    if (user) {
      return true;
    }
    this.router.navigate(['/iniciarsesion']);
    return false;
  }

}
