import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private cookie: CookieService, private globalService: GlobalService) {
  }

  login(usernameOrEmail: string, password: string, callback = null): any {
    this.globalService.setCookie(usernameOrEmail, password);
    if ( callback == null ) {
      this.globalService.postServiceCall('auth/login', { usernameOrEmail }, (res) => {
        console.log(res);
      }, true);
    } else {
      this.globalService.postServiceCall('auth/login', { usernameOrEmail }, callback, true);
    }
  }

  signup(userName: string, userPassword: string, userEmail: string, phoneNumber: string, callback = null): any {
    this.globalService.setCookie(userEmail, userPassword);
    if ( callback == null ) {
      this.globalService.postServiceCall('user', { userName, userEmail, phoneNumber }, (res) => {
        console.log(res);
      }, true);
    } else {
      this.globalService.postServiceCall('user', { userName, userEmail, phoneNumber }, callback, true);
    }
  }
}
