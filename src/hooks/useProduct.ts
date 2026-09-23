import { useState } from "react";

const useProduct = () => {
  const [filter, setFilter] = useState({
    gender: "All",
    brands: ["Puma", "Nike", "Supreme"],
    colors: ["Black", "Yellow", "Green"],
    minPrice: 16,
    maxPrice: 543,
  });

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderSummary, setOrderSummary] = useState<any>({});

  const addToCart = (product: any) => {
    if (cartItems.some((item) => item.id === product.id)) {
      alert("Product is already in the cart.");
      return;
    }
    setCartItems((prevItems) => [
      ...prevItems,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        brand: product.brand,
        quantity: 1,
      },
    ]);
  };

  const increaseQuantity = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkCartItemExists = (productId: string) => {
    return cartItems.some((item) => item.id === productId);
  };

  return {
    filter,
    setFilter,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    checkCartItemExists,
    orderSummary,
    setOrderSummary,
  };
};

export default useProduct;
