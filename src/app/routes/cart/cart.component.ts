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
  constructor(private requestService: RequestService) {
    this.onResize(null);
    this.requestService.cartDetails((resp) => {
      if (resp.status === 200) {
        this.cartDetails = resp.body.cartArray;
        this.cartDetails.forEach((cartItem) => {
          cartItem.couponDiscount = cartItem.productRetailPrice - cartItem.productSalePrice;
        });
        // console.log(this.cartDetails);
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
    item.productQuantity += 1;
  }

  decreaseProductQuantity(item): void {
    if (item.productQuantity > 1) {
      item.productQuantity -= 1;
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

  getCouponDiscount(): number {
    let couponDiscount = 0;
    this.cartDetails.forEach((cartItem) => {
      couponDiscount += cartItem.couponDiscount;
    });
    return couponDiscount;
  }

  getCartTotalPrice(): number {
    return this.getTotalPrice() - this.getTotalDiscount() + this.getDeliveryFee() - this.getCouponDiscount();
  }
}
