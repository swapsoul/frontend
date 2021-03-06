import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  term: string;
  hasValue: boolean;
  placeholdervalue = 'Search'

  constructor(public dialog: MatDialog) { }

  searchclick()
  {
    this.hasValue=!this.hasValue
    this.placeholdervalue=' ';
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(loginSignUpDialog, {
      width: '780px',
      height: '500px',
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


  constructor(
    public dialogRef: MatDialogRef<loginSignUpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: null) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
