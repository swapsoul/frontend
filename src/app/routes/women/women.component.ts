import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {

  products: any[];
  productnames: string[] = [];
  moreyoulike: any[] = [];
  toppings = new FormControl();

  toppingList: string[] = ['Popularity', 'Price- Low to High', 'Price- High to Low', 'Newest First', 'Rating'];

  constructor(private globalservice: GlobalService) {
  }

  ngOnInit(): void {
    this.globalservice.getServiceCall('product', (pdata) => {
      this.products = pdata.body.data;
      const likeproducts = [];
      for (let i = 0; i < 3; i++) {
        const randomnum = Math.floor(Math.random() * (this.products.length + 1));
        likeproducts.push(this.products[randomnum]);
      }
      this.moreyoulike = likeproducts;
    });
  }

  sort(event): void {
    if (event.value === this.toppingList[0]) {

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
