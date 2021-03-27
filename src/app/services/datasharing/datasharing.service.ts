import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  message: string;
  rr: string;

  modifyMessage(newmessage) {
    this.message = newmessage;
    console.log(this.message);
    this.rr = this.getId();
  }

  changeMessage(message: string) {
    this.message = message;
    console.log(this.message);
  }

  getId()
  {
    console.log(this.message);
    return this.message;
  }
  
  private messageSource = new BehaviorSubject<string>('bf');
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  
}
