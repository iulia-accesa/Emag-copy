import { Component, Input } from '@angular/core';
import { defaultIProduct, IProduct } from './product-card.component.interface';

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: IProduct = defaultIProduct;

  constructor() {}

  calcRating(rat: number) {
    return Math.round(rat);
  }
}
