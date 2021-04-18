import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../handlers/error-state-matcher';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  addressForm = new FormGroup({
    lineFirst: new FormControl('', [Validators.required]),
    lineSecond: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [
      Validators.required, Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]*$')
    ])
  });

  autocomplete = 'off';

  get matcher(): any {
    return new MyErrorStateMatcher();
  }

  constructor() {
  }

  ngOnInit(): void {
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

}
