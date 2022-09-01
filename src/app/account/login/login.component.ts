import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { take } from 'rxjs/operators';

import { AccountService } from './../../services/account/account.service';

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
        this.passwordTemplateValidator(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      ])
    });
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

    this.isLoading = true;

    this.accountService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    )
    .pipe(take(1))
    .subscribe({
      next: token => {
        // localStorage.setItem('userToken', JSON.stringify(token));
        this.router.navigate(['/']);
      },
      error: errorMessage => {
        if (errorMessage === 'username or password is incorrect') 
          this.errors = 'Username-ul sau parola sunt incorecte';
        else
          this.errors = 'Eroare necunoscuta!';
      }
    })
    
    this.isLoading = false;
  }
}
