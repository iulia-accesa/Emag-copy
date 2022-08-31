import { Component, Input } from '@angular/core';
import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: IProductApi | undefined;

  constructor() {}

  calcRating(rat: number) {
    return Math.round(rat);
  }
}
