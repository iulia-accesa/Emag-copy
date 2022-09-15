import { Component, Input } from '@angular/core';
import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss'],
})
export class SimilarProductsComponent  {
  @Input() products: IProductApi[] | undefined;

  constructor() {}
}
