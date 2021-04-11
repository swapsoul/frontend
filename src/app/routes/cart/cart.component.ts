import { Component, HostListener, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  dashesOnNavigation = 8;
  cartDetails = [];
  useremail:string;
  delete_product_id:string;
  username:string;
  constructor(private requestService: RequestService, private cookie: CookieService, private globalService: GlobalService) {
    this.onResize(null);
    this.requestService.cartDetails((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        console.log(resp);
        this.cartDetails = resp.body.cartArray;
        this.cartDetails.forEach((cartItem) => {
          cartItem.couponDiscount = cartItem.product.productRetailPrice - cartItem.product.productSalePrice;
        });
        console.log(this.cartDetails);
      } else {
        console.error('Error at fetching cart details');
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    if (window.innerWidth > 500) {
      this.dashesOnNavigation = 8;
    } else if (window.innerWidth > 460) {
      this.dashesOnNavigation = 6;
    } else if (window.innerWidth > 420) {
      this.dashesOnNavigation = 4;
    } else {
      this.dashesOnNavigation = 2;
    }
  }

  ngOnInit(): void {
  }

  increaseProductQuantity(item): void {
    if (item.productQuantity < 1) {
      item.productQuantity = 1;
    } else {
      item.productQuantity += 1;
    }
  }

  decreaseProductQuantity(item): void {
    if (item.productQuantity > 1) {
      item.productQuantity -= 1;
    } else {
      item.productQuantity = 1;
    }
  }

  getTotalPrice(): number {
    let sum = 0;
    this.cartDetails.forEach((cartItem) => {
      sum += cartItem.product.productRetailPrice * cartItem.productQuantity;
    });
    return sum;
  }

  getTotalDiscount(): number {
    let discount = 0;
    this.cartDetails.forEach((cartItem) => {
      discount += (cartItem.product.productRetailPrice - cartItem.product.productSalePrice) * cartItem.productQuantity;
    });
    return discount;
  }

  getDeliveryFee(): number {
    return 50;
  }

  getCartTotalPrice(): number {
    return this.getTotalPrice() - this.getTotalDiscount() + this.getDeliveryFee();
  }

  delete(item){
    //console.log(item);
    this.delete_product_id = item._id;
    this.delete_product_id=this.delete_product_id.toString();
    //console.log(this.delete_product_id);
    this.useremail = this.cookie.get('useremail');
    this.globalService.getServiceCall(`user/${this.useremail}`, (re) => {
      this.username = re.body.data["userName"];
      //console.log(this.username);
      this.globalService.deleteServiceCall(`cart`, { "_id": this.delete_product_id, "usernameOrEmail": this.username }, (re) => {
        //console.log(re);
      });
      this.requestService.cartDetails(re=>{
        //console.log(re);
        this.cartDetails = re.body.cartArray;
      })
    });
  }

  isQuantityValid(value): boolean {
    try {
      return parseInt(value.toString(), 10) > 0;
    } catch (e) {
      return false;
    }
  }
}
