import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalUrlsService {

  constructor() { }

  openUrlinNewTab(url:string){
    window.open(url,"_blank");
  }
}
