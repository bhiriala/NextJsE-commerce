"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateItemQuantity, removeItemFromCart, createCart } from "@/store/cartSlice";
import Image from "next/image";

export default function CartTableItem({ item }) {
  const i = item.imageName.indexOf("-");
  const substring = i !== -1 ? item.imageName.slice(0, i) : "";
  const imgSrc = `/assets/produts-img/${substring}/${item.imageName}`;
  const dispatch = useDispatch();
  const storeCartId = useSelector((state) => state.cart?.cartId);
  const itemInStore = useSelector((state) =>
    (state.cart?.cartData?.items || []).find((i) => String(i.id) === String(item.id))
  );

  const qty = Number(itemInStore?.qty ?? item?.qty ?? 1);
  const priceRaw = Number(item.price ?? 0);
  const discountRate = Number(item.discountRate ?? 0);
  const unitPrice = priceRaw * (1 - discountRate / 100);
  const subtotal = unitPrice * qty;

  const ensureCartId = async () => {
    let cartId = storeCartId || (typeof window !== "undefined" ? localStorage.getItem("cartId") : null);
    if (!cartId) {
      const createdId = await dispatch(createCart()).unwrap();
      cartId = createdId;
    }
    return cartId;
  };

  const handleIncrease = async () => {
    try {
      const cartId = await ensureCartId();
      await dispatch(updateItemQuantity({ cartId, itemId: item.id, qty: qty + 1 })).unwrap();
    } catch (err) {
      console.error("Unable to increase the quantity :", err);
    }
  };

  const handleDecrease = async () => {
    if (qty <= 1) return;
    try {
      const cartId = await ensureCartId();
      await dispatch(updateItemQuantity({ cartId, itemId: item.id, qty: qty - 1 })).unwrap();
    } catch (err) {
      console.error("Unable to decrease the quantity :", err);
    }
  };

  const handleDelete = async () => {
    try {
      const cartId = await ensureCartId();
      await dispatch(removeItemFromCart({ cartId, itemId: item.id })).unwrap();
    } catch (err) {
      console.error("Unable to delete article :", err);
    }
  };

  return (
    <tr className="cart_item">
      <td className="product-remove">
        <button
          type="button"
          className="remove"
          onClick={handleDelete}
          style={{
            backgroundColor: "rgb(206,84,84)",
            color: "white",
            border: "none",
            padding: "6px 8px",
            cursor: "pointer",
          }}
          aria-label="Delete article"
        >
          x
        </button>
      </td>

      <td className="product-thumbnail">
        <Link href={`/productDetails/${item.id}`}>
          <Image
            width={90}
            height={90}
            alt={item.name}
            className="shop_thumbnail"
            src={imgSrc}
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
        <div
          className="quantity buttons_added"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <button type="button" className="minus" onClick={handleDecrease} aria-label="Decrease quantity">
            -
          </button>

          <input
            type="number"
            size={4}
            className="input-text qty text"
            value={qty}
            min={1}
            step={1}
            readOnly
            aria-label="Quantity"
            style={{ width: 60, textAlign: "center" }}
          />

          <button type="button" className="plus" onClick={handleIncrease} aria-label="Increase quantity">
            +
          </button>
        </div>
      </td>

      <td className="product-subtotal">
        <span className="amount">{subtotal.toFixed(2)} $</span>
      </td>
    </tr>
  );
}
