import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private router: Router,
    private cookie: CookieService,
    private globalService: GlobalService,
    private commonService: CommonService) {
  }

  login(usernameOrEmail: string, password: string, callback = null): any {
    this.globalService.setCookie(usernameOrEmail, password);
    this.globalService.setAuthMethodCookie();
    if (callback == null) {
      this.globalService.postServiceCall('auth/login', { usernameOrEmail }, (res) => {
        console.log(res);
      }, true);
    } else {
      this.globalService.postServiceCall('auth/login', { usernameOrEmail }, callback, true);
    }
  }

  resetPassword(usernameOrEmail: string, passwordOtp: string, password: string, callback): any {
    this.globalService.setCookie(usernameOrEmail, password);
    this.globalService.putServiceCall('user/resetpassword', { usernameOrEmail, passwordOtp }, callback, true);
  }

  signup(userName: string, userPassword: string, userEmail: string, phoneNumber: string, callback = null): any {
    this.globalService.setCookie(userEmail, userPassword);
    this.globalService.setAuthMethodCookie();
    if (callback == null) {
      this.globalService.postServiceCall('user', { userName, userEmail, phoneNumber }, (res) => {
        console.log(res);
      }, true);
    } else {
      this.globalService.postServiceCall('user', { userName, userEmail, phoneNumber }, callback, true);
    }
  }

  socialSignup(user, callback): any {
    this.globalService.setCookie('', '', user.idToken);
    this.globalService.setAuthMethodCookie(user.provider);
    this.globalService.postServiceCall('user/social', user, callback, true);
  }

  socialLogin(user, callback): any {
    this.globalService.setCookie('', '', user.idToken);
    this.globalService.setAuthMethodCookie(user.provider);
    this.globalService.postServiceCall('auth/login', { usernameOrEmail: user.email }, callback, true);
  }

  cartDetails(callback): any {
    this.globalService.getServiceCall('cart', callback, true);
  }

  initCartDetails(): any {
    if (this.globalService.profileFlag) {
      this.cartDetails((resp) => {
        if (resp.status === 200) {
          this.commonService.cartData = resp.body;
        }
      });
    }
  }

  updateCartQuantity(payload, callback): any {
    this.globalService.patchServiceCall('cart', payload, callback, true);
  }

  deleteCartItem(payload, callback): any {
    this.globalService.deleteServiceCall('cart', payload, callback, true);
  }

  getLoggedUserDetails(username, callback): any {
    this.globalService.getServiceCall('user/' + username, callback, true);
  }

  updateUserDetails(payload, callback): any {
    this.globalService.putServiceCall('user', payload, callback, true);
  }

  capturePayment(payload, callback): void {
    this.globalService.postServiceCall('payment/capture', payload, callback, true);
  }

  getOrders(callback): void {
    this.globalService.getServiceCall('order', callback, true);
  }

  initializeUserFromCookie(): void {
    const username = this.cookie.get('useremail');
    const token = this.cookie.get('token');
    if (username && token) {
      this.globalService.profileFlag = true;
      this.getLoggedUserDetails(username, (resp) => {
        if (resp.status === 200) {
          this.commonService.userData = resp.body;
          this.globalService.UserName = resp.body.data.userName;
          this.initCartDetails();
        } else {
          this.globalService.clearCookies();
          this.globalService.profileFlag = false;
          this.router.navigate(['/']);
        }
      });
    }
  }
}
