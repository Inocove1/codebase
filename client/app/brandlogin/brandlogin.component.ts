import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-brandlogin',
  templateUrl: './brandlogin.component.html',
  styleUrls: ['./brandlogin.component.scss']
})
export class BrandloginComponent implements OnInit {

  loginForm: FormGroup;
  email = new FormControl('', [Validators.required,
                                       Validators.minLength(3),
                                       Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
                                          Validators.minLength(6)]);

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent) { }

  ngOnInit() {
    console.log(this.auth.loggedIn);
    this.auth.logout();
    if (this.auth.loggedIn) {
      this.router.navigate(['/brandboard']);
    }else{
      this.router.navigate(['/brandlogin']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(['/brandboard']),
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }
}
