import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ProductApiService } from 'src/app/services/product-api.service';
import { IProductApi } from '../../models/product-api.interface';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss'],
})
export class SimilarProductsComponent implements OnInit {
  @Input() products: IProductApi[] | undefined;

  constructor(private _productService: ProductApiService) {}

  ngOnInit(): void {}
}
