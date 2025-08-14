"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TopClient({ name, listProd: initialList }) {
  const pathname = usePathname();
  const [listProd, setListProd] = useState(initialList);
  const [threeProducts, setThreeProducts] = useState(true);

  useEffect(() => {
    if (name === "Recently Viewed") {
      const recentlyViewed = JSON.parse(localStorage.getItem("RecentlyViewed")) || [];
      setListProd(recentlyViewed);
    }
  }, [name]);

  const listProd3 = listProd.slice(0, 3);
  const displayedProducts = threeProducts ? listProd3 : listProd;

  function handleViewAll() {
    setThreeProducts((prev) => !prev);
  }
  console.log(displayedProducts)

  return (
  <div className="product-column">
    <div className="single-product-widget">
      <h2 className={pathname.includes("productDetails") ? "sidebar-title" : "product-wid-title"}>
        {name}
      </h2>

      {!pathname.includes("productDetails") && (
        <button className="wid-view-more" onClick={handleViewAll}>
          {threeProducts ? "View All" : "View less"}
        </button>
      )}

      {displayedProducts.map((prod, index) => {
        const i = prod.imageName.indexOf("-");
        const substring = prod.imageName.slice(0, i);
        const imgName = require(`../../assets/produts-img/${substring}/${prod.imageName}`);

        return (
          <div key={index} className="single-wid-product">
            <a href="single-product.html" className="product-image">
              <Image
                src={imgName}
                alt={prod.name}
                className="product-thumb"
                width={80}
                height={80}
              />
            </a>

            <div className="product-info">
              <h2>
                <Link href={`/productDetails/${prod.id}`}>{prod.name}</Link>
              </h2>
              <div className="product-wid-rating">
                {Array.from({ length: prod.review }).map((_, i) => (
                  <i
                    key={i}
                    className="fa fa-star"
                    style={{ color: "rgb(255, 221, 31)" }}
                  />
                ))}
              </div>
              <div className="product-wid-price">
                <ins>${(prod.price * (1 - prod.discountRate / 100)).toFixed(2)}</ins>
                <del>${prod.price.toFixed(2)}</del>
              </div>
            </div>
          </div>

        );
      })}
    </div>
  </div>
);

}
