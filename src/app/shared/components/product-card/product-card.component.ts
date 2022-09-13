import { Component, Input } from '@angular/core';
import { getPercentage } from '../../function/functionTest';

import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() set product(value: IProductApi) {
    if (value) {
      this._product = value;
      this.prodRating = Math.round(this._product.rating.rate);
    }
  }
  _product: IProductApi | undefined;
  prodRating = 0;
  discountPers: number = 0;
  constructor() {}

  ngOnInit() {
    if (this._product) {
      this.discountPers = getPercentage(this._product.rating.rate);
    }
  }
}
