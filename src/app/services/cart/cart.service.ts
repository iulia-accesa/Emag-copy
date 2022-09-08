import { ICart } from './../../shared/models/cart.interface';
import { CartApiService } from './cart-api.service';
import { Observable, map } from 'rxjs';
import { ICartProduct } from './../../shared/models/cart-product.interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CartActions from './cart.actions';
import * as CartReducer from './cart.reducer';
import * as CartSelectors from './cart.selectors';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private store: Store<CartReducer.State>,
    private CartApiService: CartApiService
  ) {
    this.store.dispatch(CartActions.loadCart());
  }

  addProduct(productId: number) {
    this.store.dispatch(CartActions.addProduct({ productId }));
  }

  removeProduct(productId: number) {
    this.store.dispatch(CartActions.removeProduct({ productId }));
  }

  getProductList$(): Observable<ICartProduct[]> {
    return this.store.select(CartSelectors.getProductList);
  }

  getProductCount$(): Observable<number> {
    return this.getProductList$().pipe(
      map((products: ICartProduct[]) => {
        return products.length;
      })
    );
  }

  placeOrder(order: ICart) {
    this.store.dispatch(CartActions.placeOrder({ order }));
  }
}
