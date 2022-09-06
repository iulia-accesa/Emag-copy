import { Router } from '@angular/router';
import { IFilterGroup } from './models/filter-group.interface';
import { IOrderGroup } from './models/order-group.interface';
import { IProduct } from './../shared/models/product.interface';

import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ProductListService } from '../services/product-list/product-list.service';

import { Store } from '@ngrx/store';
import * as ProductListPageActions from '../services/product-list/product-list.actions';
import * as ProductServiceActions from '../services/product-list/product-list-service.actions';
import { selectAllProducts } from '../services/product-list/product-list.selector';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  protected productList$: Observable<IProduct[]>;
  protected cartItemList$: Observable<number[]>;

  constructor(
    private productService: ProductListService,
    private store: Store,
    private router: Router
  ) {
    const category = this.getCategoryName();
    const key = this.getSearchKey();

    if ((category && key) || (!category && !key)) {
      this.router.navigateByUrl('');
    }

    this.productList$ = this.store.select(selectAllProducts);
  }

  getCategoryName(): string {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    return category;
  }

  getSearchKey(): string {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');

    return key;
  }

  getProductCount(): Observable<number> {
    return this.productList$.pipe(
      map((products: IProduct[]) => {
        return products.length;
      })
    );
  }

  ngOnInit(): void {
    /**
     * Call the enter action with either a query param or a category
     */
    this.store.dispatch(
      ProductListPageActions.enter({
        category: this.getCategoryName(),
        searchQuery: this.getSearchKey(),
      })
    );

    this.getCartItemList();
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
