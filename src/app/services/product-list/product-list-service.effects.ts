import { Action } from '@ngrx/store';
import { IProduct } from '../../shared/models/product.interface';
import * as ProductListPageActions from './product-list.actions';
import * as ProductServiceActions from './product-list-service.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductListService } from './product-list.service';
import { Injectable } from '@angular/core';

import { map, exhaustMap, Observable } from 'rxjs';

@Injectable()
export class ProductListServiceEffects {
  constructor(
    private productService: ProductListService,
    private actions$: Actions
  ) {}

  onEnterWithCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductListPageActions.enterWithCategory),
      exhaustMap((action) => {
        return this.productService
          .getByCategory(action.category)
          .pipe(
            map((products) => ProductServiceActions.productsInit({ products }))
          );
      })
    );
  });

  onEnterWithSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductListPageActions.enterWithSearch),
      exhaustMap((action) => {
        return this.productService
          .getBySearch(action.key)
          .pipe(
            map((products) => ProductServiceActions.productsInit({ products }))
          );
      })
    );
  });
}
