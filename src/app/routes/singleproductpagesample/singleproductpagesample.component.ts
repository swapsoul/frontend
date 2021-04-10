import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/interaction.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { DatasharingService } from 'src/app/services/datasharing/datasharing.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-singleproductpagesample',
  templateUrl: './singleproductpagesample.component.html',
  styleUrls: ['./singleproductpagesample.component.scss']
})
export class SingleproductpagesampleComponent implements OnInit {

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
  sizeselected:boolean = false;
  colorselected:boolean = false;
  isFavorite:boolean = false;
  useremail:string;
  username:string;
  selectedSize:string;
  selectedColor:string;

  searchValue = '';


  constructor(private cookie:CookieService,private route: ActivatedRoute, private datashare: DatasharingService,private _interactionService: InteractionService, private cartService: InteractionService, private globalService: GlobalService ) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params["id"]);
      this.productid = params["id"];
    })

    
    this.globalService.getServiceCall('product', (pdata) => {
      //console.log(pdata);
      console.log(pdata.body.data);
      this.products = pdata.body.data;
      //console.log(this.products.length);
      //console.log(this.pro_id);
      //this.pro_id = this.pro_id.toString();
      //console.log(this.productid);

      this.globalService.getServiceCall(`product/${this.productid}`, (re) => {
        //console.log(re.body.data[0]);
        this.productData = re.body.data[0];
        this.pid = this.productData["_id"];
        console.log(this.pid);
        this.selectedSize=this.productData["productSizes"][0];
        this.selectedColor=this.productData["productColors"][0];
      })

      var header = document.getElementById("coldiv");
      var btns = header.getElementsByClassName("btn");
      console.log(btns[0]);
      btns[0].classList.add("active");
      btns[0].classList.add("focus");
      btns[0].classList.add("kkkk");
      console.log(btns[0])
      //btns.path[1].classList.add('active');
      //b2.path[1].classList.add('focus');
      

      //this.act1();
      //this.act2();

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

  onKey(event: any) {
    this.pincode = event.target.value;
  }

  wish(){
    this.wishflag = !this.wishflag;
    const heart = document.getElementById('heat');
    heart.classList.toggle('red');
  }

 act1(b){
   console.log(b.path);
   var header = document.getElementById("myDiv");
   var btns = header.getElementsByClassName("btn");
   for(let i=0;i<btns.length;i++)
   {
     btns[i].classList.remove("active");
     btns[i].classList.remove("focus");
   }
   if(b.path.length==18){
   b.path[1].classList.add('active');
     b.path[1].classList.add('focus');
   }
   else if(b.path.length==17){
   b.path[0].classList.add('active');
   b.path[0].classList.add('focus');
   }
   this.sizeselected = true;
 }

  act2(b2) {
    this.isFavorite=true;
    console.log(b2.path);
    var header = document.getElementById("coldiv");
    var btns = header.getElementsByClassName("btn");
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove("active");
      btns[i].classList.remove("focus");
    }
    if (b2.path.length == 18) {
      b2.path[1].classList.add('active');
      b2.path[1].classList.add('focus');
    }
    else if (b2.path.length == 17) {
      b2.path[0].classList.add('active');
      b2.path[0].classList.add('focus');
    }
    this.colorselected = true;
  }

  selectionChanged(item) {
    console.log("Selected value: " + item.value);
    this.selectedSize = item.value;
  }

  selectionChangedColor(item) {
    console.log("Selected value: " + item.value);
    this.selectedColor = item.value;
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


  add_to_cart() {
    this.useremail = this.cookie.get('useremail');
    console.log(this.selectedColor);
    this.globalService.getServiceCall(`user/${this.useremail}`, (re) => {
      console.log(re.body.data);
      this.username = re.body.data["userName"];
      console.log(this.username);
      this.globalService.putServiceCall('cart', {
        "usernameOrEmail": this.username,
        "productId": this.productid,
        "product": this.pid,
        "productQuantity": 1,
        "productSize": this.selectedSize,
        "productColor": this.selectedColor
      }, (data) => {
        console.log("tttttt");
      });
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
