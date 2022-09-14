import { ICartProduct } from './cart-product.interface';
import { ICart } from './cart.interface';

export const loadCartHelper = (activeCart: ICart): ICart => {
  if (Object.keys(activeCart).length) {
    return { ...activeCart };
  }

  return {
    userId: undefined,
    date: undefined,
    products: [],
    discountPercentage: 0,
    shipping: 15,
  };
};

export const addProductHelper = (
  product: ICartProduct,
  products: ICartProduct[]
): ICartProduct[] => {
  const productIndex = products.findIndex(
    (p) => p.productId === product.productId
  );
  if (productIndex !== undefined && productIndex === -1) {
    return [...products, product];
  }

  return [...products];
};

export const removeProductHelper = (
  productId: number,
  products: ICartProduct[]
): ICartProduct[] => {
  const productIndex = products.findIndex((p) => p.productId === productId);
  if (productIndex !== undefined && productIndex >= 0) {
    let updatedProducts = [...products];
    updatedProducts.splice(productIndex, 1);

    return updatedProducts;
  }

  return [...products];
};

export const setProductQuantityHelper = (
  product: ICartProduct,
  products: ICartProduct[]
): ICartProduct[] => {
  const productIndex = products.findIndex(
    (p) => p.productId === product.productId
  );
  if (productIndex !== undefined && productIndex >= 0) {
    let updatedProducts = [...products];
    updatedProducts.splice(productIndex, 1, product);

    return updatedProducts;
  }

  return [...products];
};
