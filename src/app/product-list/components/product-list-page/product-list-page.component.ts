import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  protected productList$: Observable<ProductModel[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    (this.productList$ = this.productService.getAll()).subscribe((products) =>
      console.log(products)
    );
  }
}
