import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/interaction.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-singleproductpagesample',
  templateUrl: './singleproductpagesample.component.html',
  styleUrls: ['./singleproductpagesample.component.scss']
})
export class SingleproductpagesampleComponent implements OnInit {

  pincode: number;
  pinmessage: string;
  productData: any[];

  searchValue = '';


  constructor(private _interactionService: InteractionService, private cartService: InteractionService, private globalService: GlobalService ) {
   }

  ngOnInit(): void {
    this.productData = JSON.parse(localStorage.myArrData);
    console.log(this.productData);
  }
  onKey(event: any) {
    this.pincode = event.target.value;
  }


  verifypincode(){
    console.log(this.pincode);
    this.globalService.postServiceCall('sample',{pincode: this.pincode},(re)=>{
      console.log(re.status);
      if(re.status=="success")
      {
        this.pinmessage = "Delivery is available to your place!";
      }
      else{
        this.pinmessage = "Sorry, delivery is not available at this Pincode :(";
      }
    })
  }


  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
