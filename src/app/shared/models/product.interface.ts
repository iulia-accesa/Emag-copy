//TODO: add all re-usable interface here

import { IProductApi } from "./product-api.interface"; 

export interface IProduct extends IProductApi {
  favourite: boolean;
}
