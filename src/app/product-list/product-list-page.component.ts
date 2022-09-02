import { selectAllProducts } from './ngrx/state';
import { IFilterGroup } from './models/filter-group.interface';
import { IOrderGroup } from './models/order-group.interface';
import { IProduct } from './../shared/models/product.interface';

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
  protected productList$: Observable<IProduct[]>;
  protected cartItemList$: Observable<number[]>;

  constructor(private productService: ProductService, private store: Store) {
    /**
     * Initialize local Observables
     */

    this.productList$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductListPageActions.enter());

    this.initProducts();
    this.getFavoriteProducts();
    this.getCartItemList();
  }

  initProducts(): void {
    this.productService.getAll().subscribe((products) => {
      this.store.dispatch(ProductServiceActions.productsInit({ products }));
    });
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
