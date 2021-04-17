import { Component, HostListener, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  dashesOnNavigation = 8;
  cartDetails = [];
  quantityCallManager: any = {};
  isCartDetailsLoaded = false;
  isAddressSelection = false;

  constructor(private requestService: RequestService, private commonService: CommonService) {
    this.onResize(null);
    this.requestService.cartDetails((resp) => {
      this.isCartDetailsLoaded = true;
      if (resp.status === 200) {
        this.cartDetails = resp.body.cartArray;
        this.cartDetails.forEach((cartItem) => {
          cartItem.couponDiscount = cartItem.product.productRetailPrice - cartItem.product.productSalePrice;
        });
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

  get userAddress(): any {
    if (this.commonService.userData) {
      // return this.commonService.userData.data.userAddress;
      return Array.from(new Array(10), () => this.commonService.userData.data.userAddress[0]);
    }
  }

  increaseProductQuantity(item): void {
    if (item.productQuantity < 1) {
      item.productQuantity = 1;
    } else {
      item.productQuantity += 1;
    }
    this.modifyQuantity(item);
  }

  decreaseProductQuantity(item): void {
    if (item.productQuantity !== 1) {
      if (item.productQuantity > 1) {
        item.productQuantity -= 1;
      } else {
        item.productQuantity = 1;
      }
      this.modifyQuantity(item);
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

  delete(item): void {
    this.requestService.deleteCartItem({ _id: item._id }, (resp) => {
      if (resp.status === 200) {
        this.cartDetails.splice(this.cartDetails.findIndex((value) => value._id === item._id), 1);
      } else {
        console.error('Error while deleting product');
      }
    });
  }

  isQuantityValid(value): boolean {
    try {
      return parseInt(value.toString(), 10) > 0;
    } catch (e) {
      return false;
    }
  }

  modifyQuantity(item): void {
    if (this.isQuantityValid(item.productQuantity)) {
      if (this.quantityCallManager[item._id]) {
        clearTimeout(this.quantityCallManager[item._id]);
      }
      this.quantityCallManager[item._id] = setTimeout(() => {
        this.requestService.updateCartQuantity({
          _id: item._id,
          productQuantity: item.productQuantity
        }, (resp) => {
          if (resp.status === 200) {
            console.log('cart updated');
          } else {
            console.log('failed to update quantity');
          }
        });
      }, 2000);
    }
  }

  selectAddressAndProceed(index, address): void {
    console.log(index, address);
  }
}
