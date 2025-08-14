import { FaRedo, FaTruck, FaLock, FaGift } from "react-icons/fa";
import styles from "./promo.module.css";

const promos = [
  { icon: <FaRedo size={40} style={{marginTop:"1.5rem",marginBottom:"0.5rem"}} />, text: "30 Days return", style: styles.promo1 },
  { icon: <FaTruck size={40} style={{marginTop:"1.5rem",marginBottom:"0.5rem"}} />, text: "Free shipping", style: styles.promo2 },
  { icon: <FaLock size={40} style={{marginTop:"1.5rem",marginBottom:"0.5rem"}} />, text: "Secure payments", style: styles.promo3 },
  { icon: <FaGift size={40} style={{marginTop:"1.5rem",marginBottom:"0.5rem"}} />, text: "New products", style: styles.promo4 },
];

export default function Promo() {
  return (
    <div className={styles.promoArea}>
      <div className={styles.zigzagBottom} />
      <div className={styles.container}>
        {promos.map((promo, index) => (
          <div key={index} className={styles.singlePromoWrapper}>
            <div className={`${styles.singlePromo} ${promo.style}`}>
              {promo.icon}
              <p>{promo.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
