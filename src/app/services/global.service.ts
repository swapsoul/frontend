import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RoutesRecognized } from '@angular/router';
var headers = new HttpHeaders().set('Content-Type', []);
headers.append("Content-Type", "application/json");
headers.append('Access-Control-Allow-Origin', '*');
headers.append("enctype", "multipart/form-data");
headers.append("authToken", "0AnA9a8lRMn3xIDtXFymVzBb");
@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public BASE_API_URL = 'http://api-stage.swapsoul.com/';
    //public BASE_API_URL = 'http://localhost:4000';
    constructor(private httpClient: HttpClient, private _router: Router) { }

    public postServiceCall(url: string, params: any, callback) {


        this.httpClient.post(this.BASE_API_URL + url, params, { headers: headers }).subscribe(
            (data) => {
                var res = data;//Success                
                callback(res);

            },
            err => {
                console.error(err);
            } //Error Response
        )
    }

    public getServiceCall(url: string, callback) {

        // let BASE_API_URL = 'http://localhost:4000';
        //  console.log('BASE_API_URL is '+this.BASE_API_URL);
        this.httpClient.get(this.BASE_API_URL + url, { headers: headers }).subscribe(
            (data) => {
                var res = data;//Success Response
                callback(res);
                // this.spinner.hide();
            },
            err => {
                console.error(err)
                //this.spinner.hide();
            } //Error Response
        )
    }

    public postServiceCallToSaleBot(url: string, params: any, callback) {


        // let BASE_API_URL = 'http://localhost:4000';
        this.httpClient.post(this.BASE_API_URL + url, params, { headers: headers }).subscribe(
            (data) => {
                var res = data;//Success                
                callback(res);

            },
            err => {
                console.error(err);
            } //Error Response
        )
    }
    public putServiceCall(url: string, params: any, callback) {
        this.httpClient.put(this.BASE_API_URL + url, params, { headers: headers }).subscribe(
            (data) => {
                var res = data;//Success Response
                callback(res);
            },
            err => {
                console.error(err)
            } //Error Response
        )
    }
}
