import { IFilterGroup } from './models/filter-group.interface';
import { IOrderGroup } from './models/order-group.interface';
import { IProduct } from './../shared/models/product.interface';
import { IBrand } from './models/brand.interface';
import { IPriceRange } from './models/price-range.interface';
import { Order } from './models/order.type';

import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ProductService } from './services/product.service';

import { Store } from '@ngrx/store';
import * as ProductListPageActions from './ngrx/actions/product-list-page.actions';
import * as ProductServiceActions from './ngrx/actions/product-service.actions';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  private productListInitial: IProduct[];

  protected productList$: Observable<IProduct[]>;
  protected priceRange$: Observable<IPriceRange>;
  protected brandList$: Observable<IBrand[]>;
  protected ratingList$: Observable<number[]>;
  protected favoriteItemList$: Observable<number[]>;
  protected cartItemList$: Observable<number[]>;

  constructor(private productService: ProductService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ProductListPageActions.enter());

    this.initProducts();
    this.getFavoriteProducts();
    this.getCartItemList();
    this.getPriceRange();
    this.getRatingList();
  }

  initProducts(): void {
    this.productService.getAll().subscribe((products) => {
      this.productListInitial = products;

      this.store.dispatch(ProductServiceActions.productsInit({ products }));
    });
    this.productList$ = this.productService.getAll();
  }

  getFavoriteProducts(): void {
    this.productService.getFavoriteProductIds().subscribe((productIds) => {
      this.store.dispatch(
        ProductServiceActions.favoriteProductsLoaded({ productIds })
      );
    });
  }

  getCartItemList(): void {
    this.productService.getCartItemIds().subscribe((productIds) => {
      this.store.dispatch(
        ProductServiceActions.cartItemsLoaded({ productIds })
      );
    });
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

  addProductToFavorites(productId: number) {
    this.store.dispatch(
      ProductListPageActions.addProductToFavorites({
        productId,
      })
    );
  }

  removeProductFromFavorites(productId: number) {
    this.store.dispatch(
      ProductListPageActions.removeProductFromFavorites({
        productId,
      })
    );
  }

  orderItems(orderGroup: IOrderGroup) {
    this.store.dispatch(ProductListPageActions.orderProducts({ orderGroup }));
  }

  filterItems(filterGroup: IFilterGroup) {
    this.store.dispatch(ProductListPageActions.filterProducts({ filterGroup }));
  }
}
