import { Component, OnDestroy, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/interaction.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { DatasharingService } from 'src/app/services/datasharing/datasharing.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleproductpagesample',
  templateUrl: './singleproductpagesample.component.html',
  styleUrls: ['./singleproductpagesample.component.scss']
})
export class SingleproductpagesampleComponent implements OnInit, OnDestroy {

  pincode: number;
  pinmessage: string;
  productData: any[];
  pid: string;
  flag: number;
  message: string;
  subscription: Subscription;
  id: string;
  wishflag: boolean = false;
  origin = window.location.href;
  productid: number;
  products: any[];
  pro_id: any;

  searchValue = '';


  constructor(private route: ActivatedRoute, private datashare: DatasharingService,private _interactionService: InteractionService, private cartService: InteractionService, private globalService: GlobalService ) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //console.log(params["id"]);
      this.productid = params["id"];
    })
    this.globalService.getServiceCall('product', (pdata) => {
      //console.log(pdata);
      //console.log(pdata.body.data);
      this.products = pdata.body.data;
      //console.log(this.products.length);
      //console.log(this.pro_id);
      //this.pro_id = this.pro_id.toString();
      //console.log(this.productid);

      this.globalService.getServiceCall(`product/${this.productid}`, (re) => {
        //console.log(re.body.data[0]);
        this.productData = re.body.data[0];
        //console.log(this.productData["productId"])
      })
    })
   
    //console.log(this.productid);
    //console.log(this.pro_id);
    //console.log(this.products.length);
  
    /*this.globalService.getServiceCall(`product/${id}`, (re) => {
      console.log(re);
    })*/
    //this.productData = JSON.parse(localStorage.myArrData);
    //console.log(this.productData);
    //this.pid = this.productData["_id"].toString();
    //console.log(this.pid)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onKey(event: any) {
    this.pincode = event.target.value;
  }

  wish(){
    this.wishflag = !this.wishflag;
    const heart = document.getElementById('heat');
    heart.classList.toggle('red');
  }

  checksize()
  {
    var btnContainer = document.getElementById("myDiv");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("size");
    //console.log(btns);
    console.log(btns.length);

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
      //console.log("amqa")
      btns[i].addEventListener("click", function () {
        console.log("pppp")
        var current = document.getElementsByClassName("active");
        console.log(current);

        // If there's no active class
        if (current.length > 0) {
          console.log("prprprprpprpr")
          current[0].className = current[0].className.replace(" active", "");
        }

        // Add the active class to the current/clicked button
        console.log(this.className);
        this.className += " active";
        console.log(this.className);
      });
      console.log("ererrrrrr")
    }
  }


  verifypincode(){
    console.log(this.pincode);

    this.globalService.getServiceCall(`delivery/pin/${this.pincode}`,(re)=>{
      //console.log(re.status);
      if (re.status==200) {
        this.pinmessage = "Delivery is available to your place!";
        this.flag = 1;
      }
      else if(re.status==219){
        this.pinmessage = "Sorry, delivery is not available at this Pincode :(";
        this.flag = 0;
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
