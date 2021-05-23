import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';
import { CommonService } from '../../services/common/common.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    public commonService: CommonService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
  }

  isEditMode = false;
  phoneNumber;

  ngOnInit(): void { }

  get userAddress(): any {
    if (this.commonService.userData) {
      return this.commonService.userData.data.userAddress;
    }
  }

  get userDetails(): any {
    if (this.commonService.userData) {
      return this.commonService.userData.data;
    }
  }

  toggleEditMode(): void {
    if (this.isEditMode) {
      this.requestService.updateUserDetails({ usernameOrEmail: this.userDetails.userEmail, phoneNumber: this.phoneNumber }, (res) => {
        console.log(res);
        if (res.status === 200) {
          this.userDetails.phoneNumber = this.phoneNumber;
          this.isEditMode = !this.isEditMode;
          this.snackbarService.openMessageSnackbar('Successfully updated phone number.');
        } else {
          this.snackbarService.openMessageSnackbar('Failed to update phone number.');
        }
      });
    } else {
      this.isEditMode = !this.isEditMode;
      this.phoneNumber = this.userDetails.phoneNumber;
    }
  }

  restrictPhoneNumber(): void {
    if (this.phoneNumber.toString().length > 10) {
      this.phoneNumber = Number(this.phoneNumber.toString().substring(0, 10));
    }
  }
}
