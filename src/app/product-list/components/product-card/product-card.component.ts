import { IProduct } from 'src/app/shared/models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct;
  favorite: boolean;

  constructor() {}

  ngOnInit(): void {}
}
