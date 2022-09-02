import * as fromProducts from './reducers/products.reducer';
import { FEATURE_KEY } from './feature-key';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

export interface State {
  productList: fromProducts.State;
}

export const reducers: ActionReducerMap<State> = {
  productList: fromProducts.reducer,
};

@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, {})],
})
export class StateProductListModule {}
