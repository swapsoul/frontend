import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/interaction.service';

@Component({
  selector: 'app-singleproductpagesample',
  templateUrl: './singleproductpagesample.component.html',
  styleUrls: ['./singleproductpagesample.component.scss']
})
export class SingleproductpagesampleComponent implements OnInit {
 
  constructor(private _interactionService: InteractionService, private cartService: InteractionService ) { }

  ngOnInit(): void {
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
