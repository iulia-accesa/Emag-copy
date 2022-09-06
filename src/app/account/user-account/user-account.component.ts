import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';

import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAccountComponent implements OnInit {
  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
  }

}
