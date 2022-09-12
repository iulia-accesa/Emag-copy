import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { take } from 'rxjs';
import { IUser } from 'src/app/services/account/user.interface';
import { getIsLoggedIn } from 'src/app/services/account/account.selectors';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  user: IUser | undefined;
  error: string = '';
  isLogged: boolean = false;
  btn1 = document.getElementById('buttonIfLoggedIn') as HTMLElement;
  btn2 = document.getElementById('buttonIfNotLoggedIn') as HTMLElement;

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
  onLogout(): void {
    this._accountService.logout();
  }
}
