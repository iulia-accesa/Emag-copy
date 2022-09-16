import { Observable, map, take } from 'rxjs';
import { ICartProduct } from '../../shared/models/cart-product.interface';
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

  getProduct$(productId: number): Observable<ICartProduct | undefined> {
    return this.store
      .select(CartSelectors.selectProductList)
      .pipe(
        map((products) =>
          products.find((product) => product.productId === productId)
        )
      );
  }

  getProductList$(): Observable<ICartProduct[] | undefined> {
    return this.store.select(CartSelectors.selectProductList);
  }

  getDiscountPercentage$(): Observable<number | undefined> {
    return this.store.select(CartSelectors.selectDiscountPercentage);
  }

  getShipping$(): Observable<number | undefined> {
    return this.store.select(CartSelectors.selectShipping);
  }

  getProductCount$(): Observable<number> {
    return this.getProductList$().pipe(
      map((products: ICartProduct[] | undefined) => {
        return products ? products.length : 0;
      })
    );
  }

  setProductQuantity(productId: number, quantity: number): void {
    this.store
      .select(CartSelectors.selectProductList)
      .pipe(take(1))
      .subscribe((productList) => {
        const updatedProductList = [...productList];
        const productIndex = productList.findIndex(
          (p) => p.productId === productId
        );
        if (productIndex !== undefined && productIndex >= 0) {
          const product = {
            productId,
            quantity,
          };

          updatedProductList.splice(productIndex, 1, product);
        }

        this.store.dispatch(
          CartActions.updateProductList({ productList: updatedProductList })
        );
      });
  }

  setDiscountPercentage(discountPercentage: number) {
    this.store.dispatch(
      CartActions.setDiscountPercentage({ discountPercentage })
    );
  }

  addProduct(productId: number): void {
    this.store
      .select(CartSelectors.selectProductList)
      .pipe(take(1))
      .subscribe((productList) => {
        const updatedProductList = [...productList];
        const productIndex = productList.findIndex(
          (p) => p.productId === productId
        );
        if (productIndex === -1) {
          const product = {
            productId,
            quantity: 1,
          };
          updatedProductList.push(product);
        } else {
          const product = {
            productId,
            quantity: updatedProductList[productIndex].quantity + 1,
          };
          updatedProductList.splice(productIndex, 1, product);
        }

        this.store.dispatch(
          CartActions.updateProductList({ productList: updatedProductList })
        );
      });
  }

  removeProduct(productId: number): void {
    this.store
      .select(CartSelectors.selectProductList)
      .pipe(take(1))
      .subscribe((productList) => {
        const updatedProductList = [...productList];
        const productIndex = productList.findIndex(
          (p) => p.productId === productId
        );
        if (productIndex !== undefined && productIndex >= 0) {
          updatedProductList.splice(productIndex, 1);
        }

        this.store.dispatch(
          CartActions.updateProductList({ productList: updatedProductList })
        );
      });
  }
}
