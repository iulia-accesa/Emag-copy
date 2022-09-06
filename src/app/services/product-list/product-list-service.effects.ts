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

  initProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductListPageActions.enter),
      exhaustMap((action) => {
        const { category, searchQuery } = action;

        if (category && !searchQuery) {
          return this.productService
            .getByCategory(category)
            .pipe(
              map((products) =>
                ProductServiceActions.productsInit({ products })
              )
            );
        }
        if (searchQuery && !category) {
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

        return new Observable<IProduct[]>().pipe(
          map((products) => ProductServiceActions.productsInit({ products }))
        );
      })
    );
  });
}
