import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { RequestService } from '../../services/request/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {

  constructor(private _router: Router, private formBuilder: FormBuilder, private globalService: GlobalService, private requestService: RequestService) { }

  ngOnInit(): void {
  }
  submitStatus = false;
  message = "";
  alert = "";
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
      if (!res.error) {
        this.message = res.body.message
        this.disabledFlag = false;
        console.log(res)
      } else {
        this.message = "Password OTP email sent failed"
      }

    });
  }

  submitForm(): void {
    this.requestService.resetPassword(this.email, this.registerForm.value.passwordOtp, this.registerForm.value.password, (res) => {
      if (!res.error) {
        this.alert = "Password reset successful"
        console.log(res)
        setTimeout(() => {
          this._router.navigate(['home']);
        }, 800);
        return false;
      } else {
        this.alert = "Password reset failed"
      }

    });

  }

}
