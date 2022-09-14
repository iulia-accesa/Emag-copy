import { ICartProduct } from '../cart/cart-product.interface';

export const orderByPrice = (
  products: IProduct[],
  order: Order | ''
): IProduct[] => {
  if (order) {
    const mark = order === 'asc' ? 1 : -1;
    return [...products].sort((a: IProduct, b: IProduct) => {
      if (a.price < b.price) {
        return -1 * mark;
      } else if (a.price > b.price) {
        return 1 * mark;
      }
      return 0;
    });
  }

  return [...products];
};

export const orderByTitle = (
  products: IProduct[],
  order: Order
): IProduct[] => {
  if (order) {
    const mark = order === 'asc' ? 1 : -1;
    return [...products].sort((a: IProduct, b: IProduct) => {
      if (a.title < b.title) {
        return -1 * mark;
      } else if (a.title > b.title) {
        return 1 * mark;
      }
      return 0;
    });
  }
  return [...products];
};

export const filterByPrice = (
  products: IProduct[],
  priceRange: IPriceRange
): IProduct[] => {
  if (priceRange) {
    return [...products].filter((product) => {
      return product.price >= priceRange.min && product.price < priceRange.max;
    });
  }
  return products;
};

export const filterByRating = (
  products: IProduct[],
  ratings: any[]
): IProduct[] => {
  let filteredProducts = [...products];
  if (ratings) {
    filteredProducts = products.filter((product) => {
      let i = Math.round(product.rating.rate);
      i--;
      if (i <= 0) i++;
      return ratings[i] === true;
    });
  }
  return filteredProducts.length > 0 ? filteredProducts : [...products];
};

export const filterAndOrderProducts = (
  products: IProduct[],
  filterGroup: IFilterGroup,
  orderGroup: IOrderGroup
): IProduct[] => {
  if (filterGroup.priceRange)
    products = filterByPrice(products, filterGroup.priceRange);
  if (filterGroup.ratings)
    products = filterByRating(products, filterGroup.ratings);
  if (orderGroup.price) products = orderByPrice(products, orderGroup.price);
  if (orderGroup.title) products = orderByTitle(products, orderGroup.title);

  return products;
};
