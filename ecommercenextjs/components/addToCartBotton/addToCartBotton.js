// components/addToCartBotton/addToCartBotton.jsx
"use client";

import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";

export default function AddToCartButton({ product, img = null }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

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

  const handleAdd = useCallback(() => {
    if (!product || !product.id) return;

    // Préparer l'objet item (garder prix original + discountRate)
    const item = {
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      discountRate: Number(product.discountRate ?? 0),
      quantity: Number(qty) || 1,
      imageName: product.imageName || "",
    };

    dispatch(addItem(item));

    // feedback visuel
    setAdded(true);
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [dispatch, product, qty]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
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

      <button
        type="button"
        className="add_to_cart_button"
        onClick={handleAdd}
        disabled={added}
        style={{ padding: "8px 12px", cursor: added ? "default" : "pointer" }}
      >
        {added ? "Ajouté" : "Add to cart"}
      </button>
    </div>
  );
}
