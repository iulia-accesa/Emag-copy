import { ProductListService } from './../services/product-list/product-list.service';
import { IProductApi } from 'src/app/shared/models/product-api.interface';
import { CartService } from './../services/cart/cart.service';
import { IFilterGroup } from './models/filter-group.interface';
import { IOrderGroup } from './models/order-group.interface';

import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectAllProducts } from '../services/product-list/product-list.selector';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  pagePath: string;
  protected productList$: Observable<IProductApi[]>;

  constructor(
    private store: Store,
    private productListService: ProductListService
  ) {
    this.productList$ = this.store.select(selectAllProducts);
    this.pagePath = this.getPagePath();

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
      map((products: IProductApi[]) => {
        return products.length;
      })
    );
  }

  ngOnInit(): void {
    switch (this.pagePath) {
      case 'category':
        this.productListService.enterWithCategory(this.getCategoryName());
        break;
      case 'search':
        this.productListService.enterWithSearch(this.getSearchKey());
        break;
    }
  }

  filterAndOrderProducts(filterGroup: IFilterGroup, orderGroup: IOrderGroup) {
    this.productListService.filterAndOrderProducts(filterGroup, orderGroup);
  }
}
