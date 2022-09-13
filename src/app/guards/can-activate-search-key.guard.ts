import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanActivateSearchKey implements CanActivate {
  constructor() {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return !!route.queryParams['key'];
  }
}
