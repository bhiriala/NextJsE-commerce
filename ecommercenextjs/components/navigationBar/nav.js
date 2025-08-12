'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des catégories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchCategories();
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <div className="mainmenu-area" style={{ marginLeft: "12.3rem" }}>
      <div className="container">
        <div className="row">
          <div className="navbar">
            <ul className="nav navbar-nav navbar-expand">
              <li>
                <Link href="/" className={isActive("/") ? "active" : ""}>
                  Home
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products/${category.productListId}`}
                    className={isActive(`/products/${category.productListId}`) ? "active" : ""}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
