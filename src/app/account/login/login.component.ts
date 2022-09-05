import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { take, finalize } from 'rxjs/operators';

import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  isLoading: boolean = false;
  errors: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{4,}$/)
      ])
    });
  }

  onSubmit() {
    if (!this.loginForm.valid)
      return;

    this.isLoading = true;

    this.accountService.login$(
      this.loginForm.value.username,
      this.loginForm.value.password
    )
      .pipe(
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error: string) => {
          this.errors = (error === 'username or password is incorrect') ?
            'Username-ul sau parola sunt incorecte' : 'Eroare necunoscuta!';
        }
      });
  }
}
