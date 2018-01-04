import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-brandboard',
  templateUrl: './brandboard.component.html',
  styleUrls: ['./brandboard.component.scss']
})
export class BrandboardComponent implements OnInit {

  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent) { }

  ngOnInit() {
  }

}
