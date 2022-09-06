import { IProductApi } from 'src/app/shared/models/product-api.interface';

export type SearchBarProduct = Omit<
  IProductApi,
  'price' | 'description' | 'image'
>;
