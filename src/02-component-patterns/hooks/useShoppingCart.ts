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
      console.log({ count });
      // Si el objeto ya existe en el carrito
      if (oldShoppingCart.find((schp) => schp.id === product.id)) {
        // Si existe pero se llego a cantidad 0 lo borramos
        if (count === 0) {
          return oldShoppingCart.filter(
            (shoppingProduct) => shoppingProduct.id !== product.id
          );
        } else {
          // Si no lo actualizamos
          return oldShoppingCart.map((shoppingProduct) => {
            if (shoppingProduct.id === product.id) {
              return { ...product, count };
            } else return shoppingProduct;
          });
        }
      } else {
        //Si no existe lo agregamos o no dependiendo del count
        if (count === 0) {
          return oldShoppingCart;
        } else {
          return [...oldShoppingCart, { ...product, count }];
        }
      }
    });
  };

  return {
    shoppingCart,
    onProductCartChange,
  };
};
