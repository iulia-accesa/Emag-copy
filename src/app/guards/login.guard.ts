import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { map, Observable, take } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private _accountService: AccountService,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this._accountService.getIsLoggedIn$().pipe(
      take(1),
      map((isLoggedIn) => {
        return !isLoggedIn ? true : this._router.createUrlTree(['/my-account']);
      })
    );
  }
}
