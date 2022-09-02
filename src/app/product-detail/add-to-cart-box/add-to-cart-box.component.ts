import { Component, Input } from '@angular/core';
import { IProductApi } from 'src/app/shared/models/product-api.interface'; 

@Component({
  selector: 'app-add-to-cart-box',
  templateUrl: './add-to-cart-box.component.html',
  styleUrls: ['./add-to-cart-box.component.scss'],
})
export class AddToCartBoxComponent{
  @Input() set product(value: IProductApi) {
    if (value) {
      this._product = value;
      this.prodRating = Math.round(this._product.rating.rate);
    }
  }
  public _product: IProductApi | undefined;
  public prodRating=0;

  constructor() {}

  ngOnInit() {

  }
}
