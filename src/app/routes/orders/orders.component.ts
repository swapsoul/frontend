import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderData;
  isLoading = true;
  constructor(private requestService: RequestService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.requestService.getOrders((res) => {
      if (res.status === 200) {
        this.orderData = res.body;
      } else {
        this.snackbarService.openMessageSnackbar('Failed to fetch orders');
      }
      this.isLoading = false;
    });
  }

  getDateUsingUnixTimestamp(order: any): string {
    if (order){
      if (order.captureData) {
        if (order.captureData.created_at) {
          const date = new Date(order.captureData.created_at * 1000);
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        }
      }
    }
    return '';
  }

  getTotalOrderValue(order: any): number {
    let sum = 0;
    if (order.userCart) {
      order.userCart.forEach(p => {
        sum += p.product.productRetailPrice;
      });
    }
    return sum;
  }
}
