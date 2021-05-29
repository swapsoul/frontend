import { Injectable } from '@angular/core';
import { AddAddressComponent } from '../../components/add-address/add-address.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../snackbar/snackbar.service';
import { GlobalService } from '../global/global.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  userData: any;

  constructor(private globalService: GlobalService,
              private cookie: CookieService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService
  ) { }

  addOrEditAddress(index = null, address = null): void {
    if (index != null) {
      address.id = index;
    }
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '90%',
      maxWidth: '300px',
      height: '90%',
      maxHeight: '500px',
      data: index == null ? null : address,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const payload = {
          usernameOrEmail: this.cookie.get('useremail'),
          userAddress: {
            name: result.name,
            addressLine1: result.lineFirst,
            addressLine2: result.lineSecond,
            city: result.city,
            pincode: result.pinCode,
            contactNumber: result.contactNumber
          }
        };
        if (!isNaN(parseInt(result.id, 10))) {
          // @ts-ignore
          payload.userAddress.id = result.id;
        }
        this.globalService.putServiceCall('user', payload, (res) => {
          if (res.status === 200) {
            this.userData.data.userAddress = res.body.data.userAddress;
            this.snackbarService.openMessageSnackbar('Address added (or updated) successfully');
          } else {
            this.snackbarService.openMessageSnackbar('Failed to add (or update) address');
          }
        }, true);
      }
    });
  }

  deleteAddress(index): void {
    const payload = {
      usernameOrEmail: this.cookie.get('useremail'),
      userAddress: {
        id: index
      }
    };
    this.globalService.putServiceCall('user', payload, (res) => {
      if (res.status === 200) {
        this.userData.data.userAddress = res.body.data.userAddress;
        this.snackbarService.openMessageSnackbar('Address deleted successfully');
      } else {
        this.snackbarService.openMessageSnackbar('Failed to delete address');
      }
    }, true);
  }
}
