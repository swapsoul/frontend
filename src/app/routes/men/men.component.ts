import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {

  allData: any[];
  productnames: string[] = []
  pint: any;
  selected : string;

  toppings = new FormControl();

  toppingList: string[] = ['Popularity', 'Price- Low to High', 'Price- High to Low', 'Newest First', 'Rating'];

  ngOnInit(): void {
    this.data_service.collData().subscribe(data => {
      this.allData = data;
      //console.log("data",data);
    })
  }

  constructor(private data_service: ProductService) {
    console.log(this.allData);
   }

  

  product_Names()
  {
      for(let i=0;i<12;i++)
      {
        this.productnames.push(this.allData[i]["ProductName"]);
      }
      //console.log("ku",this.productnames)
  }

  pro(id)
  {
    console.log("id",id);
    for(let i=0;i<this.allData.length;i++)
    {
      if(i==id)
      {
        console.log(i)
      }
    }
  }

  sort(event) {
    if (event.value === this.toppingList[0]) {
      
    }

    else if(event.value == this.toppingList[1])
    {
      this.allData.sort((a, b) => (a.DiscPrice > b.DiscPrice) ? 1 : -1)
    }

    else if (event.value == this.toppingList[2]) {
      this.allData.sort((a, b) => (a.DiscPrice < b.DiscPrice) ? 1 : -1)
    }
    else if (event.value == this.toppingList[3]) {
      this.allData.sort((a, b) => (a.stock > b.stock) ? 1 : -1)
    }
    else if (event.value == this.toppingList[4]) {
      this.allData.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
    }
  }


}
