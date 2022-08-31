import { getAuthError, getIsLoading } from './../store/account.selectors';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAccount from '../store/account.actions';
import * as fromRoot from '../../app.reducer';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  loginErrors$: Observable<string>;
  isLoading$: Observable<boolean>;
  errors: string;

  constructor(
    private store: Store<fromRoot.State>
    ) { }

  ngOnInit(): void {
    this.username = new FormControl('', [
      Validators.required
    ]);
    this.password = new FormControl('', [
      Validators.required, 
      this.passwordTemplateValidator(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ]);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    });

    this.isLoading$ = this.store.select(getIsLoading);
    this.loginErrors$ = this.store.select(getAuthError);
    this.loginErrors$.subscribe(error => this.errors = error)
  }

  passwordTemplateValidator(passwordRegex: RegExp): ValidatorFn {
    return (password: AbstractControl): ValidationErrors | null => {
      const matchesTemplate = passwordRegex.test(password.value);
      if (password.value && password.value.length < 2) 
        return { template: password.value }

      return !matchesTemplate ? { template: password.value } : null;
    };
  }

  onSubmit() {
    if (!this.loginForm.valid)
      return;

    const user = new User(
      this.loginForm.value.username, 
      this.loginForm.value.password
    );
    this.store.dispatch(fromAccount.LoginStart({ user }));
  }
}
