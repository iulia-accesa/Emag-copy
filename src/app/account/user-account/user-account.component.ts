import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { finalize, take } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';
import { IUser } from 'src/app/services/account/user.interface';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAccountComponent implements OnInit {
  user: IUser | undefined;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private _accountService: AccountService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this._accountService.loadUser$()
      .pipe(
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (user) => this.user = user,
        error: (error: string) => {
          console.log(error)
          if (error === 'Error getting user data')
            this._router.navigate(['/login']);
          else
            this.error = error
        }
      });
  }

  onLogout() {
    this._accountService.logout$()
  }
}
