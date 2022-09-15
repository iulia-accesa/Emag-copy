import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class CanActivateSearchKey implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let keyFound = !!route.queryParams['key'];
    if (!keyFound) this.router.navigateByUrl('/');

    return keyFound;
  }
}
