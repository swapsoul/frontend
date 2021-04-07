import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private router: Router, private cookie: CookieService, private globalService: GlobalService) {
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

  cartDetails(callback): any {
    if ( callback == null ) {
      this.globalService.getServiceCall('cart', (res) => {
        console.log(res);
      }, true);
    } else {
      this.globalService.getServiceCall('cart', callback, true);
    }
  }

  getLoggedUserDetails(username, callback): any {
    if ( callback == null ) {
      this.globalService.getServiceCall('user/' + username, (res) => {
        console.log(res);
      }, true);
    } else {
      this.globalService.getServiceCall('user/' + username, callback, true);
    }
  }

  initializeUserFromCookie(): void {
    const username = this.cookie.get('useremail');
    const token = this.cookie.get('token');
    if (username && token) {
      this.globalService.profileFlag = true;
      this.getLoggedUserDetails(username, (resp) => {
        if (resp.status === 200) {
          this.globalService.UserName = resp.body.data.userName;
        } else {
          this.globalService.clearCookies();
          this.globalService.profileFlag = false;
          this.router.navigate(['/']);
        }
      });
    }
  }
}
