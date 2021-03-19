import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  items = [];

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }


  private _message = new Subject<string>();
  message$=this._message.asObservable();

  constructor() { }

  sendMessage(message:string){
    this._message.next(message);
  }
}
