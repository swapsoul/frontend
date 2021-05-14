import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() productData;
  isImgLoaded = false;
  constructor() { }

  ngOnInit(): void {
  }

  imgLoaded(): void {
    this.isImgLoaded = true;
  }

}
