import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { RequestService } from '../../services/request/request.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})

export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  term: string;
  hasValue: boolean;
  placeholdervalue = 'Search';

  constructor(public dialog: MatDialog) {
  }

  searchclick() {
    this.hasValue = !this.hasValue;
    this.placeholdervalue = ' ';
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(LoginSignUpDialogComponent, {
      width: '410px',
      height: '500px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-login-signup-dialog',
  templateUrl: 'loginSignUpDialog.html',
  styleUrls: [ './navbar.component.scss' ]
})

export class LoginSignUpDialogComponent implements OnInit{

  hide = true;
  submitStatus = false;
  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
  });

  registerForm: FormGroup = this.formBuilder.group({
    username: [ undefined, { validators: [ Validators.required ], updateOn: 'change' } ],
    email: [
      undefined,
      {
        validators: [ Validators.required, Validators.email ],
        updateOn: 'change',
      },
    ],
    phone: [ undefined, { updateOn: 'change' } ],
    password: [ undefined, { validators: [ Validators.required ], updateOn: 'change' } ],
  });

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<LoginSignUpDialogComponent>,
    private requestService: RequestService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: null) {
  }

  ngOnInit(): void {
    this.setPhoneValidation();
  }

  setPhoneValidation(): void {
    const phoneControl = this.registerForm.get('phone');

    phoneControl.setValidators([
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login(): void {
    this.requestService.login(this.loginForm.get('email').value, this.loginForm.get('password').value, (res) => {
      if ( !res.error ) {
        this.onNoClick();
      } else {
        console.log('Login Failed');
      }
    });
  }

  getErrorMessage(): string {
    if ( this.loginForm.get('email').hasError('required') ) {
      return 'You must enter a value';
    }

    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  submitForm(): void {
    const user = this.registerForm.value;
    this.requestService.signup(user.username, user.password, user.email, user.phone, (res) => {
      if ( !res.error ) {
        // this.onNoClick();
        console.log(res);
        this.submitStatus = true;
      } else {
        console.log('Login Failed');
        this.submitStatus = false;
      }
    });
  }

}
