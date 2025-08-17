"use client";
import { useSelector } from "react-redux";
import styles from "./cart.module.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  
  const totalAmount = items
    .reduce((acc, item) => acc + (item.price * (1 - (item.discountRate / 100)))*item.quantity, 0)
    .toFixed(2);
    // {(product.price * (1 - (product.discountRate / 100))).toFixed(2)}
    
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <span>
        Cart : <span className={styles.amount}>{totalAmount} $</span>
      </span>
      <FaShoppingCart className={styles.icon} />
      <span className={styles.badge}>{totalItems}</span>
    </div>
  );
}
