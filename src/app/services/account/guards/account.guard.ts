import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { take } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';


@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate{

  constructor(
    private _accountService: AccountService,
    private _router: Router
  ) {}

  canActivate(): boolean {
    let isLogged = false;
    this._accountService.getIsLoggedIn$()
        .pipe(take(1))
        .subscribe(isLoggedIn => {
            isLogged = isLoggedIn;
            if (isLogged)
                this._router.navigate(['/login']);
        }
    )
    return isLogged;
  }
}
