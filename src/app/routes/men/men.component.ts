import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { InteractionService } from 'src/app/interaction.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { DatasharingService } from 'src/app/services/datasharing/datasharing.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {

  allData: any[];
  products: any[];
  particularproduct: any[];
  productnames: string[] = []
  pint: any;
  selected : string;
  id : string;
  message: string;
  randomnums: any[] = [];
  moreyoulike: any[] = [];
  len:number;
  subscription: Subscription;
  origin = window.location.origin;

  toppings = new FormControl();

  toppingList: string[] = ['Discount - High to Low','Price- Low to High', 'Price- High to Low', 'Newest First', 'Rating'];

  ngOnInit(): void {
    console.log(this.origin);
    this.data_service.collData().subscribe(data => {
      this.allData = data;
      //console.log("data",data);

      this.globalservice.getServiceCall('product', (pdata) => {
        //console.log(pdata.status);
        //console.log(pdata.body.data);
        this.products = pdata.body.data;
        this.len = this.products.length;
        console.log(this.len);
        for(let i=0;i<=2;i++)
        {
          this.randomnums.push(Math.floor(Math.random() * (this.len+ 1)));
        }
        console.log(this.randomnums);
        for(let d=0;d<this.randomnums.length;d++)
        {
          this.moreyoulike.push(this.products[this.randomnums[d]]);
        }
      });
    })
  }

  

  constructor(private _router:Router,private shareservice: DatasharingService, private data_service: ProductService, private cartService: InteractionService,private globalservice: GlobalService) {
    //console.log(this.allData);
   }

   openUrl(url)
  {
    console.log(url);
    console.log(this.origin);
    this._router.navigate(['products/'+url]);
    return false;
    // window.open(this.origin + '/products/' + url,"_self");
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
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
    console.log("id",id[0]);
    for(let i=0;i<this.products.length;i++)
    {
      if(id==this.products[i]._id)
      {
        this.particularproduct = this.products[i];
      }
    }
    this.openUrl(this.particularproduct["productId"]);
    id = id.toString();
    //localStorage.myArrData = JSON.stringify(this.particularproduct);

    this.shareservice.setProjects(id);

    this.shareservice.modifyMessage(id);
    this.subscription = this.shareservice.currentMessage.subscribe(message => {
      this.message = message;
      console.log(this.message);
    })

    this.shareservice.changeMessage(id);
    

    this.globalservice.getServiceCall(`product/${id}`,(re)=>{
      console.log(re);
    })

  }

  sort(event) {
    if (event.value === this.toppingList[0]) {
      this.products.sort((a, b) => (a.productDiscount < b.productDiscount) ? 1 : -1)
    }

    else if(event.value == this.toppingList[1])
    {
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
