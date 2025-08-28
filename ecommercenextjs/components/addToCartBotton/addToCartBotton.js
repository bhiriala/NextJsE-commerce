"use client";

import { useState, useCallback, useRef, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, createCart } from "@/store/cartSlice"; // adapte le chemin si besoin
import { usePathname } from "next/navigation";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const storeCartId = useSelector((s) => s.cart?.cartId);
  const pathname = usePathname();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const increment = useCallback(() => {
    setQty((q) => q + 1);
  }, []);

  const decrement = useCallback(() => {
    setQty((q) => Math.max(1, q - 1));
  }, []);

  const onChangeQty = useCallback((e) => {
    const v = Number(e.target.value || 1);
    setQty(v >= 1 ? Math.floor(v) : 1);
  }, []);

  const handleAdd = useCallback(async () => {
    if (!product || !product.id) return;

    const item = {
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      discountRate: Number(product.discountRate ?? 0),
      qty: Number(qty) || 1, 
      imageName: product.imageName || "",
    };

    try {
      let cartId = storeCartId || (typeof window !== "undefined" ? localStorage.getItem("cartId") : null);
      if (!cartId) {
        const createdId = await dispatch(createCart()).unwrap();
        cartId = createdId;
      }
      await dispatch(addToCart({ cartId, item })).unwrap();
      setAdded(true);
      timeoutRef.current = setTimeout(() => setAdded(false), 1200);
    } catch (err) {
      console.error("Erreur ajout au panier :", err);
    }
  }, [dispatch, product, qty, storeCartId]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
      {pathname.includes("productDetails") && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            type="button"
            onClick={decrement}
            aria-label="Diminuer la quantité"
            style={{ padding: "6px 10px", cursor: "pointer" }}
          >
            −
          </button>
        
          <input
            type="number"
            min={1}
            value={qty}
            onChange={onChangeQty}
            aria-label="Quantité"
            style={{ width: 64, textAlign: "center", padding: "6px 8px" }}
          />
        

          

          <button
            type="button"
            onClick={increment}
            aria-label="Augmenter la quantité"
            style={{ padding: "6px 10px", cursor: "pointer" }}
          >
            +
          </button>
        </div>
      )}

      <button
        type="button"
        className="add_to_cart_button"
        onClick={handleAdd}
        disabled={added}
        style={{ padding: "8px 12px", cursor: added ? "default" : "pointer" }}
      >
        {added ? "Added" : "Add to cart"}
      </button>
    </div>
  );
}
