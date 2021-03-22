import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  env = environment;
  constructor(private http: HttpClient) { }

  collData(): Observable<any> {
    return this.http.get<any>("/assets/img/collectiondata.json");
  }
}
