import { ICartProduct } from './cart-product.interface';

export interface ICart {
  id: number;
  userId: number;
  date: string;
  products: ICartProduct[];
}
