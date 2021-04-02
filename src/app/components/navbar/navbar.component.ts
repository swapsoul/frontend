import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { RequestService } from '../../services/request/request.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  term: string;
  hasValue: boolean;
  placeholdervalue = 'Search';
  profileFlag = false

  constructor(public dialog: MatDialog) {
  }

  searchclick() {
    this.hasValue = !this.hasValue;
    this.placeholdervalue = ' ';
  }

  logout() {
    localStorage.clear();
    this.profileFlag = false
  }


  openDialog(): void {

    const dialogRef = this.dialog.open(LoginSignUpDialogComponent, {
      width: '412px',
      height: '510px',
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
  styleUrls: ['./navbar.component.scss']
})

export class LoginSignUpDialogComponent implements OnInit {

  myStorage = window.localStorage;
  hide = true;
  submitStatus = false;
  loginStatus = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  registerForm: FormGroup = this.formBuilder.group({
    username: [undefined, { validators: [Validators.required], updateOn: 'change' }],
    email: [
      undefined,
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'change',
      },
    ],
    phone: [undefined, { updateOn: 'change' }],
    password: [undefined, { validators: [Validators.required], updateOn: 'change' }],
  });

  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  errorMsg = '';
  errorMsglogin = '';

  constructor(
    private globalService: GlobalService,
    public snackBar: MatSnackBar,
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
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000);
  }

  login(): void {
    this.requestService.login(this.loginForm.get('email').value, this.loginForm.get('password').value, (res) => {
      if (!res.error) {

        console.log({ observe: 'response' })
        console.log(res.status)
        localStorage.setItem('token', 'true');
        this.errorMsglogin = 'Successfully Logged In'
        this.loginStatus = true;
        this.onNoClick();
      } else {
        console.log('Login Failed');
        this.errorMsglogin = 'Invalid username/password'
      }
    });
  }

  getErrorMessage(): string {
    if (this.loginForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  submitForm(): void {
    const user = this.registerForm.value;
    this.requestService.signup(user.username, user.password, user.email, user.phone, (res) => {
      if (!res.error) {
        localStorage.setItem("token", "true");
        this.errorMsg = 'Created Account succesfully!'
        this.submitStatus = true;
        this.onNoClick();
      } else {
        console.log('SigUp Error');
        this.errorMsg = 'User already exists'
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', '#689f38'],
    });
  }

}
