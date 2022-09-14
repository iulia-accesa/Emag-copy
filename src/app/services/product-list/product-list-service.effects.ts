import * as ProductListActions from './product-list.actions';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductListService } from './product-list.service';
import { Injectable } from '@angular/core';

import { map, exhaustMap } from 'rxjs';

import { ProductApiService } from '../product-api.service';

@Injectable()
export class ProductListServiceEffects {
  constructor(
    private productApiService: ProductApiService,
    private productService: ProductListService,
    private actions$: Actions
  ) {}

  private productsMatchesSearchKey(
    product: IProductApi,
    searchKey: string
  ): boolean {
    return (
      searchKey !== '' &&
      (product.title.toLowerCase().startsWith(searchKey.toLowerCase()) ||
        product.title
          .toLowerCase()
          .split(' ')
          .includes(searchKey.toLowerCase()) ||
        product.description
          .toLowerCase()
          .split(' ')
          .includes(searchKey.toLowerCase()))
    );
  }

  onEnterWithCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductListActions.enterWithCategory),
      exhaustMap((action) => {
        return this.productApiService
          .getByCategory(action.category)
          .pipe(
            map((products) => ProductListActions.productsInit({ products }))
          );
      })
    );
  });

  onEnterWithSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductListActions.enterWithSearch),
      exhaustMap((action) => {
        return this.productApiService.getAll().pipe(
          map((products) => {
            return ProductListActions.productsInit({
              products: products.filter((p) =>
                this.productsMatchesSearchKey(p, action.key)
              ),
            });
          })
        );
      })
    );
  });
}
