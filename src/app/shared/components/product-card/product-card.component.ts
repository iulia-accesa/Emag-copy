import { Component, Input } from '@angular/core';
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
  public _product: IProductApi | undefined;
  public prodRating = 0;

  constructor() {}
}
