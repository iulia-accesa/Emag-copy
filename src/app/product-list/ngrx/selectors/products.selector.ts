import { State } from '../reducers/products.reducer';

export const selectAllProducts = (state: State) => state.productList;
