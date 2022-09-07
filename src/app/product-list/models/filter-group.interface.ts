import { IPriceRange } from './price-range.interface';

export interface IFilterGroup {
  priceRange: IPriceRange;
  ratings: number[];
}
