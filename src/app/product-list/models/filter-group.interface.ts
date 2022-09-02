import { IPriceRange } from './price-range.interface';

export interface IFilterGroup {
  priceRange: IPriceRange | undefined;
  ratings: number[] | undefined;
}
