import { Component, OnInit } from '@angular/core';
import { IProductApi } from '../shared/models/product-api.interface';
import { ProductApiService } from '../services/product-api.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: IProductApi | undefined;
  productSimilar: IProductApi[] | undefined;
  productId: number = 0;
  prodCategory: string | undefined;

  constructor(
    private _productService: ProductApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    forkJoin([
      this._productService.getById(this.productId),
      this._productService.getAll(),
    ]).subscribe((res) => {
      this.product = res[0];
      this.prodCategory = this.product.category;
      this.getSameCategory(res[1]);
    });
  }

  getSameCategory(productList: IProductApi[]): void {
    this.productSimilar = productList
      .filter((item: IProductApi) => {
        return item.category === this.prodCategory;
      })
      .slice(0, 5);
  }
}
