"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { createCart, fetchCartData } from "@/store/cartSlice";

function ClientInit({ children }) {
  const dispatch = useDispatch();
  const cartId = useSelector((s) => s.cart.cartId);
  const cartData = useSelector((s) => s.cart.cartData);

  useEffect(() => {
    const storedCartId = typeof window !== "undefined" ? localStorage.getItem("cartId") : null;
    if (!storedCartId && !cartId) {
      dispatch(createCart());
      return;
    }
    if (storedCartId && !cartId) {
      dispatch(fetchCartData(storedCartId));
      return;
    }
    if (cartId && !cartData) {
      dispatch(fetchCartData(cartId));
      return;
    }

  }, [dispatch, cartId, cartData]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ClientInit>{children}</ClientInit>
    </Provider>
  );
}
