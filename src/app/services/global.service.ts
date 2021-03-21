import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RoutesRecognized } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// var headers = new HttpHeaders().set('Content-Type', []);
// headers.append("Content-Type", "application/json");
// headers.append('Access-Control-Allow-Origin', '*');
// headers.append("enctype", "multipart/form-data");
// headers.append("authToken", "0AnA9a8lRMn3xIDtXFymVzBb");


@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    // public BASE_API_URL = 'http://api-stage.swapsoul.com/';
    BASE_API_URL = 'http://localhost:4000/api/';
    headerKey = 'SwapsoulToken';
    constructor(private httpClient: HttpClient, private cookie: CookieService ) { }

    public postServiceCall(url: string, params: any, callback, withToken = false): any {
        console.log(url);
        console.log(params);
        console.log(callback);
        console.log(this.createHeaders());

        this.httpClient.post(this.BASE_API_URL + url, params, { headers: this.createHeaders(withToken) }).subscribe(
            (data) => {
                console.log('iiiiiii');
                let res = data; // Success
                callback(res);

            },
            err => {
                console.error(err);
            } // Error Response
        );
    }

    public getServiceCall(url: string, callback): any {

        // let BASE_API_URL = 'http://localhost:4000';
        //  console.log('BASE_API_URL is '+this.BASE_API_URL);
        this.httpClient.get(this.BASE_API_URL + url, { headers: this.createHeaders() }).subscribe(
            (data) => {
                let res = data; // Success Response
                callback(res);
                // this.spinner.hide();
            },
            err => {
                console.error(err);
                // this.spinner.hide();
            } // Error Response
        );
    }

    public postServiceCallToSaleBot(url: string, params: any, callback): any {


        // let BASE_API_URL = 'http://localhost:4000';
        this.httpClient.post(this.BASE_API_URL + url, params, { headers: this.createHeaders() }).subscribe(
            (data) => {
                let res = data; // Success
                callback(res);

            },
            err => {
                console.error(err);
            } // Error Response
        );
    }
    public putServiceCall(url: string, params: any, callback): any {
        this.httpClient.put(this.BASE_API_URL + url, params, { headers: this.createHeaders() }).subscribe(
            (data) => {
                let res = data; // Success Response
                callback(res);
            },
            err => {
                console.error(err);
            } // Error Response
        );
    }

  setCookie(username, secret): void {
    this.cookie.set('token', btoa(username + ':' + secret), 10, '/');
  }

  createHeaders(withToken = false): any {
      let token;
      if (withToken) {
        token = this.cookie.get('token');
      }

      let headers: HttpHeaders;
      if (withToken && token) {
        headers = new HttpHeaders().append('Content-Type', 'application/json').append(this.headerKey, token)
          .append('Access-Control-Allow-Origin', '*');
      } else {
        headers = new HttpHeaders().append('Content-Type', 'application/json').append('Access-Control-Allow-Origin', '*');
      }

      return headers;
  }
}
