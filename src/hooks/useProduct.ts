import { useEffect, useState } from "react";
import useAuthData from "./useAuthData";

const useProduct = () => {
  const { user } = useAuthData();
  const [filter, setFilter] = useState({
    gender: "All",
    brands: ["Puma", "Nike", "Supreme"],
    colors: ["Black", "Yellow", "Green"],
    minPrice: 16,
    maxPrice: 543,
  });

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderSummary, setOrderSummary] = useState<any>({
    id: 0,
    total: 0,
    discountedTotal: 0,
    userId: user.id,
    totalProducts: 0,
    totalQuantity: 0,
  });
  const [favorite, setFavorite] = useState<any[]>([]);

  const addToCart = (product: any) => {
    if (cartItems.some((item) => item.id === product.id)) {
      alert("Product is already in the cart.");
      return;
    }

    fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        products: [...cartItems, { id: product.id, quantity: 1 }],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setCartItems(data.products);
          setOrderSummary({
            id: data.id,
            total: data.total,
            discountedTotal: data.discountedTotal,
            userId: user.id,
            totalProducts: data.totalProducts,
            totalQuantity: data.totalQuantity,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding to cart");
        return;
      });
  };

  const increaseQuantity = (productId: string) => {
    fetch("https://dummyjson.com/carts/1", {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true, // this will include existing products in the cart
        products: [
          {
            id: productId,
            quantity:
              cartItems.find((item) => item.id === productId).quantity + 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setCartItems(data.products);
          setOrderSummary({
            id: data.id,
            total: data.total,
            discountedTotal: data.discountedTotal,
            userId: user.id,
            totalProducts: data.totalProducts,
            totalQuantity: data.totalQuantity,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error increasing quantity");
        return;
      });
  };

  const decreaseQuantity = (productId: string) => {
    const productQuantity = cartItems.find(
      (item) => item.id === productId,
    ).quantity;
    fetch("https://dummyjson.com/carts/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: [
          {
            id: productId,
            quantity:
              productQuantity > 1
                ? cartItems.find((item) => item.id === productId).quantity - 1
                : 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setCartItems(data.products);
          setOrderSummary({
            id: data.id,
            total: data.total,
            discountedTotal: data.discountedTotal,
            userId: user.id,
            totalProducts: data.totalProducts,
            totalQuantity: data.totalQuantity,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error decreasing quantity");
        return;
      });
  };

  const removeFromCart = (productId: string) => {
    fetch(`https://dummyjson.com/carts/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCartItems(data.products);
        setOrderSummary({
          id: data.id,
          total: data.total,
          discountedTotal: data.discountedTotal,
          userId: user.id,
          totalProducts: data.totalProducts,
          totalQuantity: data.totalQuantity,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Error removing from cart");
        return;
      });
  };

  const clearCart = (cartId: any) => {
    fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems([]);
      })
      .catch((err) => {
        console.log(err);
        alert("Error clearing cart");
      });
  };

  const checkCartItemExists = (productId: string) => {
    return cartItems.some((item) => item.id === productId);
  };

  const manageFavorite = (id: any) => {
    if (favorite.some((item) => item === id)) {
      setFavorite((prevItems) => prevItems.filter((item) => item !== id));
      alert("Remove for favorite");
      return;
    }
    setFavorite((prevItems) => [...prevItems, id]);
    alert("Added to favorite");
  };

  const checkFavorite = (id: any) => {
    return favorite.some((item) => item === id);
  };

  useEffect(() => {
    const fetchCart = () => {
      if (user.id) {
        fetch(`https://dummyjson.com/carts/user/${user.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.carts[0]) {
              setCartItems(data.carts[0].products);
              setOrderSummary({
                id: data.carts[0].id,
                total: data.carts[0].total,
                discountedTotal: data.carts[0].discountedTotal,
                userId: user.id,
                totalProducts: data.carts[0].totalProducts,
                totalQuantity: data.carts[0].totalQuantity,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            // alert("Error fetching cart");
            return;
          });
      }
    };
    fetchCart();
  }, [user]);

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
    manageFavorite,
    checkFavorite,
  };
};

export default useProduct;
