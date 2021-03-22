import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { InteractionService } from 'src/app/interaction.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {

  allData: any[];
  products: any[];
  productnames: string[] = []
  pint: any;
  selected: string;


  ngOnInit(): void {
    this.data_service.collData().subscribe(data => {
      this.allData = data;
      //console.log("data",data);
      this.globalservice.getServiceCall('product', (pdata) => {
        console.log(pdata.status);
        console.log(pdata.data);
        this.products = pdata.data;
      })
    })
  }

  constructor(private data_service: ProductService, private globalservice: GlobalService) { }
  toppings = new FormControl();

  toppingList: string[] = ['Popularity', 'Price- Low to High', 'Price- High to Low', 'Newest First', 'Rating'];

product_Names()
{
  for (let i = 0; i < 12; i++) {
    this.productnames.push(this.allData[i]["ProductName"]);
  }
  //console.log("ku",this.productnames)
}

pro(id)
{
  console.log("id", id);
  for (let i = 0; i < this.allData.length; i++) {
    if (i == id) {
      console.log(i)
    }
  }
}

  sort(event) {
    if (event.value === this.toppingList[0]) {

    }

    else if (event.value == this.toppingList[1]) {
      this.products.sort((a, b) => (a.productSalePrice > b.productSalePrice) ? 1 : -1)
    }

    else if (event.value == this.toppingList[2]) {
      this.products.sort((a, b) => (a.productSalePrice < b.productSalePrice) ? 1 : -1)
    }
    else if (event.value == this.toppingList[3]) {

    }
    else if (event.value == this.toppingList[4]) {
      this.products.sort((a, b) => (a.productRating < b.productRating) ? 1 : -1)
    }
  }
}
