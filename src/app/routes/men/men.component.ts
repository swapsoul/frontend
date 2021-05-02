import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {

  products: any[];
  moreyoulike: any[] = [];
  toppings = new FormControl();

  toppingList: string[] = ['Discount - High to Low', 'Price- Low to High', 'Price- High to Low', 'Newest First', 'Rating'];

  constructor(private globalservice: GlobalService) {
  }

  ngOnInit(): void {
    this.globalservice.getServiceCall('product', (pdata) => {
      this.products = pdata.body.data;
      const morelike = [];
      for (let i = 0; i < 3; i++) {
        const randomnum = Math.floor(Math.random() * (this.products.length + 1));
        morelike.push(this.products[randomnum]);
      }
      this.moreyoulike = morelike;
    });
  }

  sort(event): void {
    if (event.value === this.toppingList[0]) {
      this.products.sort((a, b) => (a.productDiscount < b.productDiscount) ? 1 : -1);
    } else if (event.value === this.toppingList[1]) {
      this.products.sort((a, b) => (a.productSalePrice > b.productSalePrice) ? 1 : -1);
    } else if (event.value === this.toppingList[2]) {
      this.products.sort((a, b) => (a.productSalePrice < b.productSalePrice) ? 1 : -1);
    } else if (event.value === this.toppingList[3]) {

    } else if (event.value === this.toppingList[4]) {
      this.products.sort((a, b) => (a.productRating < b.productRating) ? 1 : -1);
    }
  }

}
