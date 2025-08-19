"use client";

import { useSelector } from "react-redux";

export default function OrderSummary() {
  const cartData = useSelector((state) => state.cart?.cartData ?? null);

  const items = cartData?.items ?? [];

  const subTotal = items.reduce((acc, item) => {
    const price = Number(item.price ?? 0);
    const discount = Number(item.discountRate ?? 0);
    const qty = Number(item.qty ?? 1);
    const unit = price * (1 - discount / 100);
    return acc + unit * qty;
  }, 0);

  const taxPercent = Number(cartData?.tax ?? 0);
  const taxAmount = subTotal * (taxPercent / 100);
  const total = subTotal + taxAmount;

  const fmt = (v) => Number(v ?? 0).toFixed(2);

  if (!cartData || items.length === 0) {
    return (
      <div id="order_review">
        <h3>Your Order</h3>
        <p>Votre commande est vide.</p>
      </div>
    );
  }

  return (
    <div id="order_review">
      <h3>Your Order</h3>
      <table className="shop_table">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Product</th>
            <th style={{ textAlign: "right" }}>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const price = Number(item.price ?? 0);
            const discount = Number(item.discountRate ?? 0);
            const qty = Number(item.qty ?? 1);
            const unit = price * (1 - discount / 100);
            const lineTotal = unit * qty;

            return (
              <tr key={String(item.id)}>
                <td>
                  {item.name} × {qty}
                </td>
                <td style={{ textAlign: "right" }}>${fmt(lineTotal)}</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <th>Cart Subtotal</th>
            <td style={{ textAlign: "right" }}>${fmt(subTotal)}</td>
          </tr>

          <tr>
            <th>Tax ({taxPercent}%)</th>
            <td style={{ textAlign: "right" }}>${fmt(taxAmount)}</td>
          </tr>

          <tr>
            <th>Order Total</th>
            <td style={{ textAlign: "right" }}>
              <strong>${fmt(total)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
