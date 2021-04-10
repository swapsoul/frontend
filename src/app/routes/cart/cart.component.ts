import { Component, HostListener, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  dashesOnNavigation = 8;
  cartDetails = [];
  cart_id:string;
  constructor(private requestService: RequestService) {
    this.onResize(null);
    this.requestService.cartDetails((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        console.log(resp);
        this.cartDetails = resp.body.cartArray;
        this.cartDetails.forEach((cartItem) => {
          cartItem.couponDiscount = cartItem.productRetailPrice - cartItem.productSalePrice;
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
      sum += cartItem.productRetailPrice;
    });
    return sum;
  }

  getTotalDiscount(): number {
    let discount = 0;
    this.cartDetails.forEach((cartItem) => {
      discount += cartItem.productRetailPrice - cartItem.productSalePrice;
    });
    return discount;
  }

  getDeliveryFee(): number {
    return 50;
  }

  getCartTotalPrice(): number {
    return this.getTotalPrice() - this.getTotalDiscount() + this.getDeliveryFee();
  }

  delete(){
    console.log("gdksf");
    this.requestService.cartDetails((re)=>{
      console.log(re);
      //this.cart_id = re.body
    })
  }

  isQuantityValid(value): boolean {
    try {
      return parseInt(value.toString(), 10) > 0;
    } catch (e) {
      return false;
    }
  }
}
