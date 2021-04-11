import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }
  submitStatus = false;
  hide = true;
  registerForm: FormGroup = this.formBuilder.group({
    email: [
      undefined,
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'change',
      },
    ],
    verification_code: [undefined, { validators: [Validators.required], updateOn: 'change' }],
    password: [undefined, { validators: [Validators.required], updateOn: 'change' }],
  }); 

  submitForm(): void {
    const user = this.registerForm.value;
    // this.requestService.signup(user.username, user.password, user.email, user.phone, (res) => {
    //   if (!res.error) {
    //     localStorage.setItem("token", "true");
    //     this.errorMsg = 'Created Account succesfully!'
    //     this.submitStatus = true;
    //     this.globalService.profileFlag = true;
    //     this.globalService.UserName = user.username;
    //     this.onNoClick();
    //   } else {
    //     console.log('SigUp Error');
    //     this.errorMsg = 'User already exists'
    //   }
    // });
  }

}
