import { getAuthError, getIsLoading } from './../store/account.selectors';
import { from, map, Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  loginForm: FormGroup = null;
  email: FormControl = null;
  password: FormControl = null;

  loginErrors$: Observable<string>;
  isLoading$: Observable<boolean>;
  errors: string;

  constructor(
    private store: Store<fromRoot.State>
    ) { 
    fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json=>console.log(json))
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, 
      // this.passwordTemplateValidator(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });

    this.isLoading$ = this.store.select(getIsLoading);
    this.loginErrors$ = this.store.select(getAuthError);
    this.loginErrors$.subscribe(error => this.errors = error)
  }

  passwordTemplateValidator(passwordRegex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const template = passwordRegex.test(control.value);
      if (control.value && control.value.length < 2) 
        return {template: control.value}
      return !template ? {template: control.value} : null;
    };
  }

  onSubmit() {
    if (!this.loginForm.valid)
      return;
    
    const user = new User(
      this.loginForm.value.email, 
      this.loginForm.value.password
    );
    this.store.dispatch(fromAccount.LoginStart({ user }));
    
  }
}
