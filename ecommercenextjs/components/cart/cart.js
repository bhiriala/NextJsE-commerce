"use client";
import { useSelector } from "react-redux";
import styles from "./cart.module.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const items = useSelector((state) => state.cart?.cartData?.items ?? []);
  const totalAmount = items
    .reduce((acc, item) => {
      const price = Number(item.price ?? 0);
      const discountRate = Number(item.discountRate ?? 0);
      const qty = Number(item.qty ?? 1);
      const unit = price * (1 - discountRate / 100);
      return acc + unit * qty;
    }, 0);

  const totalAmountStr = totalAmount.toFixed(2);
  const totalItems = items.reduce((acc, item) => acc + Number(item.qty ?? 1), 0);

  return (
    <div className={styles.cartContainer}>
      <span>
        Cart : <span className={styles.amount}>{totalAmountStr} $</span>
      </span>

      <FaShoppingCart className={styles.icon} />
      <span className={styles.badge}>{totalItems}</span>
    </div>
  );
}
