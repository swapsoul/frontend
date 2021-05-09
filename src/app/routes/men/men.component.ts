import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { FilterPipe } from 'src/app/routes/filter.pipe';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {

  products: any[];
  moreyoulike: any[] = [];
  toppings = new FormControl();
  ratings = new FormControl();
  maxi = new FormControl();
  mini = new FormControl();
  disc = new FormControl();
  filt = new FilterPipe();
  filteredProducts: any[];
  rating:string="";
  maxp:string[] = [];
  minp:string="";
  dis:string="";

  toppingList: string[] = ['Discount - High to Low', 'Price- Low to High', 'Price- High to Low', 'Newest First', 'Rating'];
  ratingList: string[] = ['4* & above','3* & above','2* & above','1* & above'];
  maxplist: string[] = ['300-500','500-700','700+'];
  minplist: string[] = ['250', '500', '1000', '1500', '2000', '2500'];
  disclist: string[] = ['10% or more', '20% or more', '30% or more', '40% or more', '50% or more', '60% or more', '70% or more', '80% or more', '90% or more'];

  constructor(private globalservice: GlobalService) {
  }

  ngOnInit(): void {
    this.globalservice.getServiceCall('product', (pdata) => {
      this.products = pdata.body.data;
      const morelike = [];
      for (let i = 0; i < 3; i++) {
        const randomnum = Math.floor(Math.random() * this.products.length);
        morelike.push(this.products[randomnum]);
      }
      this.moreyoulike = morelike;
    });
  }

  sort(event): void {
    this.products = this.filt.transform(this.products,this.maxp);
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

  filter(event){
    this.rating = event.value;
  }

  maxprice(event){
    this.maxp = event.value;
  }

  minprice(event) {
    this.minp = event.value;
  }

  discount(event){
    this.dis = event.value;
  }
}
