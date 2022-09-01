import { Component, Input } from '@angular/core';
import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: any;
  prodRating: number = 0;

  constructor() {}

  ngOnInit() {
    this.prodRating = Math.round(this.product.rating.rate);
  }
}
