import { CartService } from './../services/cart/cart.service';
import { IFilterGroup } from './models/filter-group.interface';
import { IOrderGroup } from './models/order-group.interface';
import { IProduct } from './../shared/models/product.interface';

import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as ProductListPageActions from '../services/product-list/product-list.actions';
import { selectAllProducts } from '../services/product-list/product-list.selector';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  pagePath: string;
  protected productList$: Observable<IProduct[]>;

  constructor(private store: Store, private cartService: CartService) {
    this.productList$ = this.store.select(selectAllProducts);
    this.pagePath = this.getPagePath();

    this.cartService.addProduct(3);
    this.cartService.addProduct(3);
    this.cartService.addProduct(6);
    this.cartService.addProduct(7);
    this.cartService.addProduct(11);
    this.cartService.getProductList$().subscribe((l) => console.log(l));
    this.cartService.getDiscountPercentage$;

    switch (this.pagePath) {
      case 'category':
        this.setPageTitle(this.toTitleCase(this.getCategoryName()));
        break;
      case 'search':
        this.setPageTitle(`Cautare '${this.getSearchKey()}'`);
        break;
    }
  }

  toTitleCase(text: string): string {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  setPageTitle(title: string): void {
    document.title = title;
  }

  getPagePath(): string {
    const path = decodeURI(window.location.pathname).split('/')[1];

    return path;
  }

  getCategoryName(): string {
    const category = decodeURI(window.location.pathname).split('/')[2];

    return category;
  }

  getSearchKey(): string {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');

    return key ? key : '';
  }

  getProductCount(): Observable<number> {
    return this.productList$.pipe(
      map((products: IProduct[]) => {
        return products.length;
      })
    );
  }

  ngOnInit(): void {
    switch (this.pagePath) {
      case 'category':
        this.store.dispatch(
          ProductListPageActions.enterWithCategory({
            category: this.getCategoryName(),
          })
        );
        break;
      case 'search':
        {
          const key = this.getSearchKey();

          this.store.dispatch(
            ProductListPageActions.enterWithSearch({
              key: key ? key : '',
            })
          );
        }
        break;
    }
  }

  orderItems(orderGroup: IOrderGroup) {
    this.store.dispatch(ProductListPageActions.orderProducts({ orderGroup }));
  }

  filterItems(filterGroup: IFilterGroup) {
    this.store.dispatch(ProductListPageActions.filterProducts({ filterGroup }));
  }
}
