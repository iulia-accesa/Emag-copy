import { ICart } from './cart.interface';
import { CartApiService } from './cart-api.service';
import { Observable, map, take } from 'rxjs';
import { ICartProduct } from './cart-product.interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CartActions from './cart.actions';
import * as CartReducer from './cart.reducer';
import * as CartSelectors from './cart.selectors';

@Injectable()
export class CartService {
  constructor(private store: Store<CartReducer.State>) {
    this.store.dispatch(CartActions.loadCart());
  }

  getProductList$(): Observable<ICartProduct[] | undefined> {
    return this.store.select(CartSelectors.getProductList);
  }

  getDiscountPercentage$(): Observable<number | undefined> {
    return this.store.select(CartSelectors.getDiscountPercentage);
  }

  getShipping$(): Observable<number | undefined> {
    return this.store.select(CartSelectors.getShipping);
  }

  getProductCount$(): Observable<number> {
    return this.getProductList$().pipe(
      map((products: ICartProduct[] | undefined) => {
        return products ? products.length : 0;
      })
    );
  }

  addProduct(productId: number): void {
    this.store
      .select(CartSelectors.getProductList)
      .pipe(take(1))
      .subscribe((products) => {
        const productPosition = products?.findIndex(
          (cart) => cart.productId === productId
        );
        if (productPosition && productPosition === -1) {
          const product: ICartProduct = {
            productId,
            quantity: 1,
          };
          this.store.dispatch(CartActions.addProduct({ product }));
        }
      });
  }

  removeProduct(productId: number): void {
    this.store
      .select(CartSelectors.getProductList)
      .pipe(take(1))
      .subscribe((products) => {
        const productPosition = products?.findIndex(
          (cart) => cart.productId === productId
        );

        if (productPosition !== undefined && productPosition >= 0) {
          this.store.dispatch(CartActions.removeProduct({ productPosition }));
        }
      });
  }

  setProductQuantity(productId: number, quantity: number): void {
    this.store
      .select(CartSelectors.getProductList)
      .pipe(take(1))
      .subscribe((products) => {
        const productPosition = products?.findIndex(
          (cart) => cart.productId === productId
        );
        if (productPosition !== undefined && productPosition >= 0) {
          const product: ICartProduct = {
            productId,
            quantity,
          };
          this.store.dispatch(
            CartActions.setProductQuantity({ productPosition, product })
          );
        }
      });
  }
}
