import Link from "next/link";
import styles from './header.module.css'
import Cart from "../cart/cart";
import SearchBar from "../searchBar/searchBar";
import Image from "next/image";
import logo from "../../assets/img/logo.png";

export default function Header() {
  return (
   <header className={styles.header}>
      <div className={styles.branding}>
        <Link href="/" className={styles.logoLink}>
          <Image src={logo} alt="Logo" className="logo" width={150} height={150} />
        </Link>
      </div>
      <div className={styles.center}>
        <SearchBar />
      </div>
      <div className={styles.actions}>
        <Cart />
      </div>
    </header>
  );
}
