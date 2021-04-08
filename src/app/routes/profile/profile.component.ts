import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private globalService: GlobalService, private cookie:CookieService) { }

  flag:number = 0;
  flag1:number = 0;
  username: string;
  useremail: string;
  data: any[];
  phone:any;
  userName: string;
  userEmail:string;
  mobile: any;
  address: string;
  error:number = 0;
  error1:number = 0;

  ngOnInit(): void {
    this.userEmail = this.cookie.get('useremail');
    console.log(this.userEmail);
    this.data = this.globalService.getProfileData();
    console.log(this.data);
    this.globalService.getServiceCall(`user/${this.userEmail}`, (re) => {
      //console.log(re.body.data);
      this.phone = re.body.data["phoneNumber"];
      this.useremail = re.body.data["userEmail"];
      this.userName = re.body.data["userName"];
      //console.log(this.useremail);
      //console.log(this.phone);
    });
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

  onSubmit() {
    //console.log(this.mobile);
  }

  onKey(event) {
     this.mobile = event.target.value; 
     //console.log(this.mobile);
    }


}
