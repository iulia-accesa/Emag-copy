import { Component, Input } from '@angular/core';
import { IProduct } from './product-card.component.interface';

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: IProduct | undefined;

  constructor() {}

  calcRating(rat: number) {
    return Math.round(rat);
  }
}
