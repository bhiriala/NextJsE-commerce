'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigationBar.module.css";

export default function Navbar({categories}) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
  if(pathname === "/cart" || pathname === "/checkout") {
    return <></>;
  }

  return (
    <div className="mainmenu-area">
      <div className="container">
        <div className="row">
          <nav className={styles.navbar}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link
                  href="/"
                  className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}
                >
                  Home
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id} className={styles.navItem}>
                  <Link
                    href={`/products/${category.productListId}`}
                    className={`${styles.navLink} ${
                      isActive(`/products/${category.productListId}`) ? styles.active : ""
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
