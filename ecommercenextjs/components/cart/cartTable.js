"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import CartTableItem from "./cartTableItem";

export default function CartTable() {
  const items = useSelector((state) => state.cart?.cartData?.items ?? []);

  if (!items || items.length === 0) {
    return (
      <div className="cart-empty">
        <p>Votre panier est vide.</p>
        <Link href="/">Continuer vos achats</Link>
      </div>
    );
  }

  return (
    <table cellSpacing={0} className="shop_table cart">
      <thead>
        <tr>
          <th className="product-remove">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Total</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <CartTableItem item={item} key={String(item.id)} />
        ))}

        <tr>
          <td className="actions" colSpan={6} style={{ textAlign: "right", paddingTop: "1rem" }}>
            <Link href="/checkout" className="checkout-button button alt wc-forward">
              Checkout
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
