import { Component, Input } from '@angular/core';
import { getPercentage } from 'src/app/shared/function/functionTest';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

@Component({
  selector: 'app-add-to-cart-box',
  templateUrl: './add-to-cart-box.component.html',
  styleUrls: ['./add-to-cart-box.component.scss'],
})
export class AddToCartBoxComponent {
  @Input() set product(value: IProductApi) {
    if (value) {
      this._product = value;
      this.prodRating = Math.round(this._product.rating.rate);
    }
  }
  discountPers: number = 0;
  oldPrice: number = 0;
  _product: IProductApi | undefined;
  prodRating = 0;

  constructor() {}

  ngOnInit() {
    if (this._product) {
      this.discountPers = getPercentage(this._product.rating.rate);
      this.oldPrice = Math.round(
        (1 + this.discountPers / 100) * this._product.price
      );
    }
  }
}
