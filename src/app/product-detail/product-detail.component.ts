import { Component, OnInit } from '@angular/core';
import { IProductApi } from '../shared/models/product-api.interface';
import { ProductApiService } from '../services/product-api.service';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  productList: any;
  productSimilar: any;
  productId: number | undefined;
  prodCategory: string | undefined;

  constructor(
    private _productService: ProductApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.getProduct(this.productId!);
  }

  getProduct(productId: number) {
    return this._productService
      .getById(productId)
      .subscribe((data: IProductApi[]) => {
        this.product = data;
        this.prodCategory = this.product.category;
        this.getSameCategory();
      });
  }

  getSameCategory() {
    return this._productService.getAll().subscribe((data: IProductApi[]) => {
      this.productList = data;
      this.prodCategory = this.product.category;
      this.productSimilar = this.productList.filter((item: any) => {
        return item.category === this.prodCategory;
      });
    });
  }
}
