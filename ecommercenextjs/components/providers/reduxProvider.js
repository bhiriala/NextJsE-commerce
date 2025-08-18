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
    // lecture sûre du localStorage côté client
    const storedCartId = typeof window !== "undefined" ? localStorage.getItem("cartId") : null;

    // Priorité : si on a un cartId dans le store utiliser celui-là (ex : après createCart)
    if (!storedCartId && !cartId) {
      dispatch(createCart());
    } else if (storedCartId && !cartId) {
      // on a un id en localStorage -> récupérer le panier
      dispatch(fetchCartData(storedCartId));
    } else if (cartId) {
      // si cartId déjà dans le store -> refresh des données
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
