import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { map, Observable, take } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';


@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate{

  constructor(
    private _accountService: AccountService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._accountService.getIsLoggedIn$().pipe(
      take(1),
      map(isLoggedIn => {
        return isLoggedIn ? true : this._router.createUrlTree(['/login']);
      })
    )
  }
}
