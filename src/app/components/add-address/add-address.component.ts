import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../handlers/error-state-matcher';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  addressForm = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    lineFirst: new FormControl('', [Validators.required]),
    lineSecond: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [
      Validators.required, Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]*$')
    ]),
    contactNumber: new FormControl('', [
      Validators.required, Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$')
    ])
  });

  autocomplete = 'off';

  isEditAddress = false;

  get matcher(): any {
    return new MyErrorStateMatcher();
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.addressForm.setValue({
        id: this.data.id,
        name: this.data.name ? this.data.name : '',
        lineFirst: this.data.addressLine1,
        lineSecond: this.data.addressLine2,
        city: this.data.city,
        pinCode: this.data.pincode,
        contactNumber: this.data.contactNumber ? this.data.contactNumber : ''
      });
      this.isEditAddress = true;
    }
  }

  get name(): any {
    return this.addressForm.get('name');
  }

  get lineFirst(): any {
    return this.addressForm.get('lineFirst');
  }

  get lineSecond(): any {
    return this.addressForm.get('lineSecond');
  }

  get city(): any {
    return this.addressForm.get('city');
  }

  get pinCode(): any {
    return this.addressForm.get('pinCode');
  }

  get contactNumber(): any {
    return this.addressForm.get('contactNumber');
  }

}
