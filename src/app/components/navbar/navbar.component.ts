import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { RequestService } from '../../services/request/request.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  term: string;
  hasValue: boolean;
  placeholdervalue = 'Search';

  constructor(public dialog: MatDialog) { }

  searchclick()
  {
    this.hasValue=!this.hasValue
    this.placeholdervalue=' ';
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(loginSignUpDialog, {
      width: '410px',
      height: '370px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'loginSignUpDialog',
  templateUrl: 'loginSignUpDialog.html',
  styleUrls: ['./navbar.component.scss']
})

export class loginSignUpDialog {

  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<loginSignUpDialog>,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: null) { }

    ngOnInit() {
    this.globalService.getServiceCall('user', (result) => {
      console.log("***************************" + JSON.stringify(result.data));
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login(): any {
    this.requestService.login(this.loginForm.get('email').value, this.loginForm.get('password').value, (res) => {
      if (!res.error) {
        this.onNoClick();
      } else {
        console.log('Login Failed');
      }
    });
  }

  getErrorMessage(): string {
    if (this.loginForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

}
