import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  message: string;
  rr: string;

  id1: string;

  modifyMessage(newmessage) {
    this.message = newmessage;
    console.log(this.message);
    this.rr = this.getId();
  }

  setProjects(id: any) {
    this.id1 = id;
  }

  changeMessage(message: string) {
    this.message = message;
    console.log(this.message);
  }

  getId()
  {
    console.log(this.id1);
    return this.id1;
  }
  
  private messageSource = new BehaviorSubject<string>('bf');
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  
}
