import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalUrlsService {

  constructor() { }

  openUrlInNewTab(url: string): void{
    window.open(url, '_blank');
  }

  openUrlInTopWindow(url: string): void {
    window.open(url, 'WhatsApp', 'width:100, height=100');
  }
}
