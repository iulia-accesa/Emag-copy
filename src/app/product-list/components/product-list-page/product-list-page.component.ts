import { IBrand } from './../../models/brand.interface';
import { Order } from './../../models/order.type';
import { IPriceRange } from './../../models/price-range.interface';

import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';

import { Store } from '@ngrx/store';
import * as ProductListPageActions from '../../ngrx/actions/product-list-page.actions';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  private productListInitial: ProductModel[];

  protected productList$: Observable<ProductModel[]>;
  protected priceRange$: Observable<IPriceRange>;
  protected brandList$: Observable<{}>;
  protected ratingList$: Observable<number[]>;
  protected favoriteItemList$: Observable<number[]>;
  protected cartItemList$: Observable<number[]>;

  constructor(private productService: ProductService, private store: Store) {
    this.productService.getBrands().subscribe((b) => console.log(b));
  }

  ngOnInit(): void {
    this.getProducts();
    this.getFavoriteProducts();
    this.getBrandList();
    this.getPriceRange();
    this.getRatingList();

    this.store.dispatch(ProductListPageActions.enter());
  }

  getProducts(): void {
    this.productService
      .getAll()
      .subscribe((products) => (this.productListInitial = products));
    this.productList$ = this.productService.getAll();
  }

  getFavoriteProducts(): void {
    const storageFavList = localStorage.getItem('favoriteItemList');
    const favList = JSON.parse(storageFavList);

    this.favoriteItemList$ = storageFavList ? of(favList) : of([]);
  }

  getCartItemList(): void {
    /**
     * fetch local storage...
     */
  }

  getBrandList(): void {
    this.brandList$ = this.productService.getBrands();
  }

  getPriceRange(): void {
    this.priceRange$ = this.productService.getPriceRange();
  }

  getRatingList(): void {
    this.ratingList$ = this.productService.getRatingCount();
  }

  markProductAsFavorite(productId: number) {
    this.store.dispatch(
      ProductListPageActions.markProductAsFavorite({
        productId,
      })
    );
  }

  orderByPrice(order: Order) {
    this.store.dispatch(
      ProductListPageActions.orderByPrice({
        order,
      })
    );
  }

  filterByPrice(range: IPriceRange) {
    this.store.dispatch(
      ProductListPageActions.filterByPrice({
        range,
      })
    );
  }

  filterByBrand(brands: IBrand[]) {
    this.store.dispatch(
      ProductListPageActions.filterByBrands({
        brands,
      })
    );
  }

  filterByRating(ratings: number[]) {
    this.store.dispatch(
      ProductListPageActions.filterByRatings({
        ratings,
      })
    );
  }
}
