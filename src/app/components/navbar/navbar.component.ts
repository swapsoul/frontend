import { Component, OnInit, Inject, EventEmitter, Input, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { RequestService } from '../../services/request/request.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { ExternalUrlsService } from 'src/app/services/externalUrls/external-urls.service'
import { CommonService } from '../../services/common/common.service';
import { FacebookLoginProvider,GoogleLoginProvider, SocialUser , SocialAuthService} from 'angularx-social-login';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit, AfterViewInit {
  // profileFlag = GlobalService.profileFlag;
  // profileFlag: boolean;
  public isCollapsed = true;
  isSticky = false;

  @ViewChild('stickyMenu') menuElement: ElementRef;

  term: string;
  hasValue: boolean;
  placeholdervalue = 'Search';

  constructor(private externalUrl: ExternalUrlsService,
              public dialog: MatDialog,
              public globalService: GlobalService,
              private _router: Router,
              public commonService: CommonService,
              private socialAuthService: SocialAuthService,) {
  }


  searchclick() {
    this.hasValue = !this.hasValue;
    this.placeholdervalue = ' ';
  }

  openInNewTab(url:string){
    this.externalUrl.openUrlInNewTab(url);
  }

  logout() {
    this.isCollapsed = true;
    localStorage.clear();
    this.globalService.profileFlag = false;
    this.globalService.clearCookies();
    this.commonService.cartData = {};
    this.socialAuthService.signOut();
    this._router.navigate(['home']);
    // console.log("After logged out",this.globalService.profileFlag )
    return false;
  }


  openDialog(): void {
    this.isCollapsed = true;
    const dialogRef = this.dialog.open(LoginSignUpDialogComponent, {
      width: '90%',
      maxWidth: '350px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("after closed",this.globalService.profileFlag)
      // console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.onResize(null);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(): void {
    this.onResize(null);
    this.isSticky = window.scrollY > 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_): void {
    document.getElementById('psuedo-navbar').style.height = parseInt(this.menuElement.nativeElement.clientHeight, 10) + 'px';
  }
}

@Component({
  selector: 'app-login-signup-dialog',
  templateUrl: 'loginSignUpDialog.html',
  styleUrls: ['./navbar.component.scss']
})

export class LoginSignUpDialogComponent implements OnInit {
  signinForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean; 

  myStorage = window.localStorage;
  hide = true;
  submitStatus = false;
  loginStatus = false;
  autocomplete = 'off';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  isSocialSignup = false;
  isSocialSignupQueryPending = false;
  isSocialLoginQueryPending = false;

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
    public globalService: GlobalService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginSignUpDialogComponent>,
    private requestService: RequestService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private socialAuthService: SocialAuthService,
    private loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    // console.log(this.globalService.profileFlag)
    this.setPhoneValidation();
    this.socialAuthService.authState.subscribe((user) => {
      if (!this.user) {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      if (this.loggedIn) {
        if (this.isSocialSignup) {
          this.socialSignup();
        } else {
          if (!this.isSocialLoginQueryPending) {
            this.isSocialLoginQueryPending = true;
            this.requestService.socialLogin(this.user, (resp) => {
              this.isSocialLoginQueryPending = false;
              if (resp.status === 200) {
                this.errorMsglogin = 'Successfully Logged In';
                this.globalService.profileFlag = true;
                this.loginStatus = true;
                this.globalService.UserName = resp.body.data.userName;
                this.commonService.userData = resp.body;
                this.requestService.initCartDetails();
                this.onNoClick();
              } else {
                if (resp.status === 404 && resp.error.message === 'User Not Found') {
                  this.socialSignup();
                } else {
                  console.log('Login Failed');
                  this.errorMsglogin = 'Invalid Login';
                  this.openSnackBar('Invalid Login', null);
                }
              }
            });
          }
        }
      }
      }
      // this.requestService.signup(user.name, null , user.email, '0000000000', (res) => {
      //   if (!res.error) {
      //     localStorage.setItem("token", "true");
      //     this.errorMsg = 'Created Account succesfully!'
      //     this.submitStatus = true;
      //     this.globalService.profileFlag = true;
      //     this.globalService.UserName = user.name;
      //     this.commonService.userData = res.body;
      //     this.onNoClick();
      //   } else {
      //     console.log('SigUp Error');
      //     this.errorMsg = 'User already exists';
      //     this.openSnackBar('Failed to signup', null);
      //   }
      // });
    });
  }

  socialSignup(): void {
    if (!this.isSocialSignupQueryPending) {
      this.isSocialSignupQueryPending = true;
      this.loaderService.show();
      this.requestService.socialSignup(this.user, (resp) => {
        console.log(resp);
        this.loaderService.hide();
        this.isSocialSignupQueryPending = false;
        if (resp.status === 200) {
          this.errorMsg = 'Created Account succesfully!';
          this.submitStatus = true;
          this.globalService.profileFlag = true;
          this.globalService.UserName = this.user.email.split('@')[0];
          this.commonService.userData = resp.body;
          this.onNoClick();
        } else {
          console.log('SigUp Error');
          this.errorMsg = 'User already exists';
          this.openSnackBar('Failed to signup', null);
        }
      });
    }
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
    }, 500);
  }

  signInWithFB(isSignup: boolean): void {
    this.isSocialSignup = isSignup;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signInWithGoogle(isSignup: boolean): void {
    this.isSocialSignup = isSignup;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  login(): void {
    this.requestService.login(this.loginForm.get('email').value, this.loginForm.get('password').value, (res) => {
      if (!res.error) {

        localStorage.setItem('token', 'true');
        this.errorMsglogin = 'Successfully Logged In';
        this.globalService.profileFlag = true;
        this.loginStatus = true;
        this.globalService.UserName = res.body.data.userName;
        this.commonService.userData = res.body;
        this.requestService.initCartDetails();
        this.onNoClick();
        // console.log(this.globalService.profileFlag)
      } else {
        console.log('Login Failed');
        this.errorMsglogin = 'Invalid username/password';
        this.openSnackBar('Invalid username/password', null);
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
        this.globalService.profileFlag = true;
        this.globalService.UserName = user.username;
        this.commonService.userData = res.body;
        this.onNoClick();
      } else {
        console.log('SigUp Error');
        this.errorMsg = 'User already exists';
        this.openSnackBar('Failed to signup', null);
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
