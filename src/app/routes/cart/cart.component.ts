import { Component, HostListener, OnInit , NgZone} from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { CommonService } from '../../services/common/common.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AddAddressComponent } from '../../components/add-address/add-address.component';
import {ICustomWindow, WindowRefService} from './window-ref.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private _window: ICustomWindow;
  public rzp: any;
  public options: any = {
    key: 'rzp_test_AFvnJiqPbj1XkI', // add razorpay key here
    name: 'Swapsoul',
    description: 'Shopping',
    // amount: , // razorpay takes amount in paisa
    prefill: {
      // name: 'mounika nimmu',
      // email: 'mounika.nimmu@gmail.com', // add your email id
    },
    notes: {},
    theme: {
      color: '#3880FF'
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          this.router.navigate(['cart']);
          // add current page routing if payment fails
        })
      })
    }
  }; 

  dashesOnNavigation = 8;
  cartDetails = [];
  quantityCallManager: any = {};
  isCartDetailsLoaded = false;
  isAddressSelection = false;
  isAddressIndex = null;

  

  constructor(
    private zone: NgZone,
    private winRef: WindowRefService,
    private requestService: RequestService,
    public commonService: CommonService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router:Router,
    public globalService: GlobalService
  ) {
    this._window = this.winRef.nativeWindow;
    this.onResize(null);
    this.requestService.cartDetails((resp) => {
      this.isCartDetailsLoaded = true;
      if (resp.status === 200) {
        this.cartDetails = resp.body.cartArray;
        this.commonService.cartData = resp.body;
        this.cartDetails.forEach((cartItem) => {
          cartItem.couponDiscount = cartItem.product.productRetailPrice - cartItem.product.productSalePrice;
        });
      } else {
        console.error('Error at fetching cart details');
      }
    });
  }

  initPay(): void {
    this.options.prefill['email'] = this.commonService.userData.data.userEmail
    this.options.prefill['name'] = this.commonService.userData.data.userName
    this.options['amount'] = 100 * this.getCartTotalPrice()
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.rzp.open();
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      console.log("Payment detail --->",res)
      let jsonData = {
        "paymentId": res.razorpay_payment_id,
        "amount": 100 * this.getCartTotalPrice(),
        "currency": "INR",
        "userEmail": this.commonService.userData.data.userEmail,
        "userOrders" : {
          "paymentId": res.razorpay_payment_id,
          "deliveryStatus": "Order placed",
          "userAddress" : this.commonService.userData.data.userAddress[this.isAddressIndex]
        },
        "userCart" : this.cartDetails
      };
      if (res){
        this.requestService.capturePayment(jsonData, (re) => {
          console.log(re);
        });
      }
      this.router.navigate(['home']);
      // add API call here  
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
      return this.commonService.userData.data.userAddress;
      // if (this.commonService.userData.data.userAddress.length > 0) {
      //   return Array.from(new Array(10), () => this.commonService.userData.data.userAddress[0]);
      // }
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
        this.commonService.cartData.totalQty = this.cartDetails.length;
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
    this.isAddressIndex = index
    console.log(index, address);
  }
}
