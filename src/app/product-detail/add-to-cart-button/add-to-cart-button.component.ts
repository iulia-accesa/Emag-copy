import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss'],
})
export class AddToCartButtonComponent {
  constructor(private cartService: CartService) {}
  @Input() set product(value: IProductApi){
    if(value){
      this._product = value
    }
  }

  _product:IProductApi|undefined;

  addProductToCart(){
    this.cartService.addProduct(this._product!.id)
  }
}
