"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeItem } from "@/store/cartSlice";

export default function CartTableItem({ item }) {
  const dispatch = useDispatch();
  const itemInStore = useSelector((state) =>
    (state.cart.items || []).find((i) => String(i.id) === String(item.id))
  );

  const qty = Number(itemInStore?.quantity ?? item.quantity ?? 1);
  const priceRaw = Number(item.price ?? 0);
  const discountRate = Number(item.discountRate ?? 0);
  const unitPrice = priceRaw * (1 - discountRate / 100);
  const subtotal = unitPrice * qty;

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: qty + 1 }));
  };

  const handleDecrease = () => {
    if (qty > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: qty - 1 }));
    }
  };

  const handleDelete = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <tr className="cart_item">
      <td className="product-remove">
        <button
          type="button"
          className="remove"
          onClick={handleDelete}
          style={{ backgroundColor: "rgb(206,84,84)", color: "white", border: "none", padding: "6px 8px", cursor: "pointer" }}
          aria-label="Supprimer l'article"
        >
          ×
        </button>
      </td>

      <td className="product-thumbnail">
        <Link href={`/productDetails/${item.id}`}>
          <img
            width={145}
            height={145}
            alt={item.name}
            className="shop_thumbnail"
            src={item.imageName ?? "/placeholder.png"}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </td>

      <td className="product-name">
        <Link href={`/productDetails/${item.id}`}>{item.name}</Link>
      </td>

      <td className="product-price">
        <span className="amount">{unitPrice.toFixed(2)} $</span>
      </td>

      <td className="product-quantity">
        <div className="quantity buttons_added" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button type="button" className="minus" onClick={handleDecrease} aria-label="Diminuer quantité">-</button>

          <input
            type="number"
            size={4}
            className="input-text qty text"
            value={qty}
            min={1}
            step={1}
            readOnly
            aria-label="Quantité"
            style={{ width: 60, textAlign: "center" }}
          />

          <button type="button" className="plus" onClick={handleIncrease} aria-label="Augmenter quantité">+</button>
        </div>
      </td>

      <td className="product-subtotal">
        <span className="amount">{subtotal.toFixed(2)} $</span>
      </td>
    </tr>
  );
}
