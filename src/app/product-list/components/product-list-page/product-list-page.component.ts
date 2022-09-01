import { IProduct } from './../../../shared/models/product.interface';
import { IBrand } from './../../models/brand.interface';
import { IPriceRange } from './../../models/price-range.interface';
import { Order } from './../../models/order.type';

import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';

import { Store } from '@ngrx/store';
import * as ProductListPageActions from '../../ngrx/actions/product-list-page.actions';
import * as ProductServiceActions from '../../ngrx/actions/product-service.actions';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  private productListInitial: IProduct[];

  protected productList$: Observable<IProduct[]>;
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
    this.productService.getAll().subscribe((products) => {
      this.productListInitial = products;

      this.store.dispatch(ProductServiceActions.productsLoaded({ products }));
    });
    this.productList$ = this.productService.getAll();
  }

  getFavoriteProducts(): void {
    const storageFavList = localStorage.getItem('favoriteItemList');
    const productIds: number[] = storageFavList
      ? JSON.parse(storageFavList)
      : [];

    this.favoriteItemList$ = of(productIds);

    this.store.dispatch(
      ProductServiceActions.favoriteProductsLoaded({ productIds })
    );
  }

  getCartItemList(): void {
    const storageCartItemList = localStorage.getItem('cartItemList');
    const productIds: number[] = storageCartItemList
      ? JSON.parse(storageCartItemList)
      : [];

    this.cartItemList$ = of(productIds);

    this.store.dispatch(ProductServiceActions.cartItemsLoaded({ productIds }));
  }

  getBrandList(): void {
    this.brandList$ = this.productService.getBrands();

    this.productService
      .getBrands()
      .subscribe((brands: IBrand[]) =>
        this.store.dispatch(ProductServiceActions.brandsLoaded({ brands }))
      );
  }

  getPriceRange(): void {
    this.priceRange$ = this.productService.getPriceRange();

    this.productService
      .getPriceRange()
      .subscribe((range: IPriceRange) =>
        this.store.dispatch(ProductServiceActions.priceRangeLoaded({ range }))
      );
  }

  getRatingList(): void {
    this.ratingList$ = this.productService.getRatingCount();

    this.productService
      .getRatingCount()
      .subscribe((ratings: number[]) =>
        this.store.dispatch(
          ProductServiceActions.ratingCountLoaded({ ratings })
        )
      );
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
