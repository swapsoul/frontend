import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { CookieService } from 'ngx-cookie-service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private request: RequestService,private globalService: GlobalService, private cookie:CookieService) { }

  flag:number = 0;
  flag1:number = 0;
  addressflag:number = 0;
  username: string;
  useremail: string;
  data: any[];
  phone:any;
  useraddress : any[] = [];
  userName: string;
  userEmail:string;
  mobile: any;
  address: string;
  error:number = 0;
  error1:number = 0;
  addline1: string;
  addline2: string;
  city: string;
  pin: any;
  addupsuccess: boolean = false;
  pincodesmall: boolean = false;

  ngOnInit(): void {
    this.userEmail = this.cookie.get('useremail');
    console.log(this.userEmail);
    this.data = this.globalService.getProfileData();
    console.log(this.data);
    this.globalService.getServiceCall(`user/${this.userEmail}`, (re) => {
      console.log(re);
      this.phone = re.body.data["phoneNumber"];
      this.useremail = re.body.data["userEmail"];
      this.userName = re.body.data["userName"];
      this.useraddress = re.body.data["userAddress"][0];
      //console.log(this.useremail);
      //console.log(this.phone);
    });
    this.addupsuccess = false;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  removedisabled(){
    document.querySelector("input[name='phone']").removeAttribute("disabled");
    this.flag=1;
  }

  removedisabled1() {
    document.querySelector("input[name='address']").removeAttribute("disabled");
    this.flag1 = 1;
  }

  updateMe(){
    this.flag=0;
    if(this.mobile.length<10)
    {
      this.error=1;
      return;
    }
    else{
      this.error=2;
    this.globalService.putServiceCall('user', { usernameOrEmail: this.useremail, phoneNumber: this.mobile }, (data) => {
      //console.log(data);
    })
  }
  }

  updateAddress(){
    this.addressflag=0;
    if (this.addline1){
    this.useraddress['addressLine1'] = this.addline1;
    }
    console.log(this.addline2);
    if (this.addline2){
    this.useraddress['addressLine2'] = this.addline2;
    }
    if (this.city){
    this.useraddress['city'] = this.city;
    }
    if(this.pin){
      if(this.pin.length<6)
      {
        this.pincodesmall = false;
        return;
      }
      this.pincodesmall = true;
    this.useraddress['pincode'] = this.pin;
    }
    console.log(this.useraddress);
    this.useraddress['id'] = 0;
    this.globalService.putServiceCall('user', { usernameOrEmail: this.useremail, phoneNumber: this.mobile, userAddress: this.useraddress }, (data) => {
      //console.log(data);
    });
    this.addupsuccess = true;
  }

  onSubmit() {
    //console.log(this.mobile);
  }

  onKey(event) {
     this.mobile = event.target.value; 
     //console.log(this.mobile);
    }

  onKeyline1(event) {
    this.addline1 = event.target.value;
    //console.log(this.addline1);
  }

  onKeyline2(event) {
    this.addline2 = event.target.value;
    //console.log(this.addline2);
  }

  onKeycity(event) {
    this.city = event.target.value;
    //console.log(this.city);
  }

  onKeypin(event) {
    this.pin = event.target.value;
    //console.log(this.pin);
  }

  removeDisabledAddress(){
      document.querySelector("input[name='Line1']").removeAttribute("disabled");
     document.querySelector("input[name='Line2']").removeAttribute("disabled");
     document.querySelector("input[name='city']").removeAttribute("disabled");
     document.querySelector("input[name='pin']").removeAttribute("disabled");
      this.addressflag = 1;
  }


}
