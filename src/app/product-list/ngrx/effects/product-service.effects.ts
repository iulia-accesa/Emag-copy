import * as ProductListPageActions from '../actions/product-list-page.actions';
import * as ProductServiceActions from '../actions/product-service.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './../../services/product.service';
import { Injectable } from '@angular/core';

import { mergeMap, map, exhaustMap } from 'rxjs';

@Injectable()
export class ProductServiceEffects {
  constructor(
    private productService: ProductService,
    private actions$: Actions
  ) {}

  initProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductListPageActions.enter),
      exhaustMap((action) => {
        const { category, searchQuery } = action;

        if (category) {
          return this.productService
            .getByCategory(category)
            .pipe(
              map((products) =>
                ProductServiceActions.productsInit({ products })
              )
            );
        }
        if (searchQuery) {
          return this.productService
            .getBySearch(searchQuery)
            .pipe(
              map((products) =>
                ProductServiceActions.productsInit({ products })
              )
            );
        }
        /**
         * In case no category and no query was supplied
         */

        return this.productService
          .getAll()
          .pipe(
            map((products) => ProductServiceActions.productsInit({ products }))
          );
      })
    );
  });
}
