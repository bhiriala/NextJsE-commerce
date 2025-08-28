// components/redux/ReduxProvider.js
"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/store/store"; // adapte le chemin si besoin
import { useEffect } from "react";
import { createCart,fetchCartData } from "@/store/cartSlice";

function ClientInit({ children }) {
  const dispatch = useDispatch();
  const cartId = useSelector((s) => s.cart.cartId);

  useEffect(() => {
    const storedCartId = typeof window !== "undefined" ? localStorage.getItem("cartId") : null;

    if (!storedCartId && !cartId) {
      dispatch(createCart());
    } else if (storedCartId && !cartId) {
      dispatch(fetchCartData(storedCartId));
    } else if (cartId) {
      dispatch(fetchCartData(cartId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ClientInit>{children}</ClientInit>
    </Provider>
  );
}
