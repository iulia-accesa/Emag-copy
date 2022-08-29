import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, this.passwordTemplateValidator(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
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
    if (this.loginForm.valid)
      this.login();
  }

  login() {

  }
}
