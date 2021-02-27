import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {

  allData: any[];
  productnames: string[] = []
  pint: any;


  ngOnInit(): void {
    this.data_service.collData().subscribe(data => {
      this.allData = data;
      //console.log("data",data);
    })
  }

  constructor(private data_service: ProductService) { }
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
}