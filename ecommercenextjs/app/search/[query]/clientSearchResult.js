"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Product from "../../../components/product/product";

export default function ClientSearchResult({ products }) {
  const router = useRouter();
  console.log("ClientSearchResult products:", products);

  useEffect(() => {
    if (products.length === 1) {
      router.push(`/productDetails/${products[0].id}`);
    }
  }, [products, router]);
  console.log(products)

  if (products.length === 0) {
    return <p>Aucun produit disponible.</p>;
  }

  return (
    <div className="container">
      <div className="gridProduct">
        {products.map((prod, index) => {
          const i = prod.imageName.indexOf("-");
          const substring = i !== -1 ? prod.imageName.slice(0, i) : "";
          const imgName = `/assets/produts-img/${substring}/${prod.imageName}`;

       return (
            
                <Product
                prod={prod}
                key={index}
                img={imgName}
                />
           
            );
        })}
      </div>
    </div>
  );
}
