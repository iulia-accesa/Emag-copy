import { ICartProduct } from './cart-product.interface';

export interface ICart {
  userId?: number;
  date?: string;
  products?: ICartProduct[];
  discountPercentage?: number;
  shipping?: number;
}
