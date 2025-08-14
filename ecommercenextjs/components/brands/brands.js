import Image from "next/image";
import styles from "./brands.module.css";
import brand1 from "../../assets/img/brand1.png";
import brand2 from "../../assets/img/brand2.png";
import brand3 from "../../assets/img/brand3.png";
import brand4 from "../../assets/img/brand4.png";
import brand5 from "../../assets/img/brand5.png";
import brand6 from "../../assets/img/brand6.png";

export default function Brands() {
  const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand1, brand2];

  return (
    <div className={styles.brandsArea}>
      <div className={styles.zigzagBottom} />
      <div className={styles.brandWrapper}>
        <div className={styles.brandList}>
          {brands.map((brand, index) => (
            <div key={index} className={styles.brandItem}>
              <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                width={260} 
                height={150}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.zigzagBottom} />
    </div>
  );
}
