import { Observable, map } from 'rxjs';
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
    const product = {
      productId,
      quantity: 1,
    };

    this.store.dispatch(CartActions.addProduct({ product }));
  }

  removeProduct(productId: number): void {
    this.store.dispatch(CartActions.removeProduct({ productId }));
  }

  setProductQuantity(productId: number, quantity: number): void {
    const product = {
      productId,
      quantity,
    };

    this.store.dispatch(CartActions.setProductQuantity({ product }));
  }

  setDiscountPercentage(discountPercentage: number) {
    this.store.dispatch(
      CartActions.setDiscountPercentage({ discountPercentage })
    );
  }
}
