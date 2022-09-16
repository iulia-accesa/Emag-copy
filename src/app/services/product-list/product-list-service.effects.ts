import { ProductListUiService } from './product-list-ui.service';
import * as ProductListActions from './product-list.actions';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { map, exhaustMap, catchError, of } from 'rxjs';

import { ProductApiService } from '../product-api.service';

@Injectable()
export class ProductListServiceEffects {
  constructor(
    private productApiService: ProductApiService,
    private actions$: Actions,
    private productListUiService: ProductListUiService
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
      exhaustMap((action) =>
        this.productApiService.getByCategory(action.category).pipe(
          map((products) => {
            this.productListUiService.productListLoading.next(false);
            return ProductListActions.productsInitSuccess({ products });
          }),
          catchError((error) => {
            this.productListUiService.productListError.next(true);
            return of(ProductListActions.productsInitFailure({ error }));
          })
        )
      )
    );
  });

  onEnterWithSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductListActions.enterWithSearch),
      exhaustMap((action) =>
        this.productApiService.getAll().pipe(
          map((products) => {
            this.productListUiService.productListLoading.next(false);
            return ProductListActions.productsInitSuccess({
              products: products.filter((products) =>
                this.productsMatchesSearchKey(products, action.key)
              ),
            });
          }),
          catchError((error) => {
            this.productListUiService.productListError.next(true);
            return of(ProductListActions.productsInitFailure({ error }));
          })
        )
      )
    );
  });
}
