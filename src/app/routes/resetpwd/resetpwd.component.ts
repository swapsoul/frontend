import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {

  constructor(private _router: Router, private formBuilder: FormBuilder, private globalService: GlobalService) { }

  ngOnInit(): void {
  }
  submitStatus = false;
  message = "";
  disabledFlag = true;
  hide = true;
  email: string;
  registerForm: FormGroup = this.formBuilder.group({
    passwordOtp: [undefined, { validators: [Validators.required], updateOn: 'change' }],
    password: [undefined, { validators: [Validators.required], updateOn: 'change' }],
  });

  emailForm: FormGroup = this.formBuilder.group({
    email: [
      undefined,
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'
      },
    ],
  });

  submitEmail(): void {
    this.email = this.emailForm.value.email
    console.log(this.email)
    this.globalService.getServiceCall(`user/resetpassword/` + this.emailForm.value.email, (res) => {
      this.message = res.body.message
      this.disabledFlag = false;
      console.log(res)
    });
  }

  submitForm(): void {
    this.globalService.putServiceCall(`user/resetpassword`, { usernameOrEmail: this.email, passwordOtp: this.registerForm.value.passwordOtp, userPassword: this.registerForm.value.password }, (res) => {
      console.log(res)
      this._router.navigate(['home']);
      return false;
    });

  }

}
