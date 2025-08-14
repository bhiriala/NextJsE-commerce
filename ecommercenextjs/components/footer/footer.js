import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column} style={{marginLeft:"-5rem",marginRight:"3rem"}}>
          <h2 className={styles.logo}>MyStore</h2>
          <p>
            SES Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis sunt id doloribus vero quam laborum quas alias dolores
            blanditiis iusto consequatur, modi aliquid eveniet eligendi iure
            eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam.
            Laborum commodi veritatis magni at?
          </p>
        </div>

        <div className={styles.column} style={{marginRight:"4rem"}}>
          <h3 className={styles.title}>Categories</h3>
          <ul className={styles.menu}>
            <li><Link style={{marginLeft:"8.6rem"}} href="/products/20">Samsung</Link></li>
            <li><Link style={{marginLeft:"9.3rem"}}  href="/products/10">Apple</Link></li>
            <li><Link style={{marginLeft:"10rem"}}  href="/products/30">LG</Link></li>
            <li><Link style={{marginLeft:"9.5rem"}}  href="/products/50">Sony</Link></li>
            <li><Link style={{marginLeft:"9rem"}}  href="/products/40">Huawei</Link></li>
          </ul>
        </div>

        <div className={styles.column} style={{marginRight:"-7rem"}}>
          <h3 className={styles.title}>Newsletter</h3>
          <p>
            Sign up to our newsletter and get exclusive deals you won't find
            anywhere else straight to your inbox!
          </p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Type your email" />
            <button type="submit" style={{backgroundColor:"#307bd1ff"}}>SUBSCRIBE</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
