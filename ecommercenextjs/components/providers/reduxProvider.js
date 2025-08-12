"use client";

import { useMemo, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import { setCart } from "@/store/cartSlice";

export default function ReduxProvider({ children }) {
  const preloaded = useMemo(() => {
    try {
      const raw = localStorage.getItem("cart");
      const items = raw ? JSON.parse(raw) : [];
      return { cart: { items, ...(() => {
        let total=0,count=0;
        (items || []).forEach(it => { const q=Number(it.quantity||1); total+=Number(it.price||0)*q; count+=q; });
        return { total, count };
      })() } };
    } catch (e) {
      return undefined;
    }
  }, []);

  const store = useMemo(() => makeStore(preloaded), [preloaded]);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem("cart", JSON.stringify(state.cart.items));
      } catch {}
    });
    return unsubscribe;
  }, [store]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      const items = raw ? JSON.parse(raw) : [];
      store.dispatch(setCart(items));
    } catch {}
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}