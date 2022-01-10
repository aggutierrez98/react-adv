import { useState } from "react";
import { Product, ProductInCart } from "../interfaces/interfaces";

export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<ProductInCart[]>([]);

  const onProductCartChange = ({
    count,
    product,
  }: {
    count: number;
    product: Product;
  }) => {
    setShoppingCart((oldShoppingCart) => {
      const productInCart: ProductInCart = oldShoppingCart.find(
        (shcp) => shcp.id === product.id
      ) || { ...product, count: 0 };

      if (Math.max(productInCart.count + count, 0) > 0) {
        productInCart.count += count;

        if (oldShoppingCart.find((schp) => schp.id === product.id)) {
          return oldShoppingCart.map((shoppingProduct) => {
            if (shoppingProduct.id === product.id) {
              return productInCart;
            } else return shoppingProduct;
          });
        } else {
          return [...oldShoppingCart, productInCart];
        }
      }

      //Borrar el producto
      return oldShoppingCart.filter(
        (shoppingProduct) => shoppingProduct.id !== product.id
      );
    });
  };

  return {
    shoppingCart,
    onProductCartChange,
  };
};
