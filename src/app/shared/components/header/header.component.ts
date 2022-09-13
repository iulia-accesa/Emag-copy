import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  error: string = '';
  isLogged: boolean = false;

  constructor(
    private _router: Router,
    private _accountService: AccountService
  ) {}

  ngOnInit(): void {
    this._accountService
      .getIsLoggedIn$()
      .pipe(take(1))
      .subscribe((isLoggedIn) => {
        this.isLogged = isLoggedIn;
      });
  }

  btnMyAccount(): void {
    if (this.isLogged) {
      this._router.navigate(['/my-account']);
    } else {
      this._router.navigate(['/login']);
    }
  }
  onMyCartClick(): void {
    this._router.navigate(['/cart-overview']);
  }
  onLogout(): void {
    this._accountService.logout();
  }
}
