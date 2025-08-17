"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";

export default function Product(props) {
  const { prod, img } = props;
  const pathname = usePathname();
  const Tag = pathname === "/cart" ? "h3" : "h2";

  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (!prod || !prod.id) return;
    const item = {
      id: prod.id,
      name: prod.name,
      price: Number(prod.price) || 0,
      quantity: 1,
      imageName: prod.imageName || "",
      discountRate:Number(prod.discountRate) || 0
    };

    dispatch(addItem(item));
    setAdded(true);
    const t = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(t);
  }, [dispatch, prod]);

  return (
    <div className="single-shop-product">
      <div className={pathname === "/cart" ? "attachment-shop_catalog wp-post-image" : "product-upper"}>
        <Image
          src={img}
          alt={prod?.name || "product"}
          width={160}
          height={160}
        />
      </div>

      <Tag>
        <Link
          href={`/productDetails/${prod?.id}`}
          style={{ color: pathname === "/cart" ? "black" : "" }}
        >
          {prod?.name}
        </Link>
      </Tag>

      <div className={pathname === "/cart" ? "price" : "product-carousel-price"}>
        <ins className={pathname === "/cart" ? "amount" : ""}>
          ${((prod?.price || 0) * (1 - ((prod?.discountRate || 0) / 100))).toFixed(2)}
        </ins>
        {pathname === "/cart" ? null : <del>${(prod?.price || 0).toFixed(2)}</del>}
      </div>

      <div className={pathname === "/cart" ? "" : "product-option-shop"}>
        <button
          type="button"
          className="add_to_cart_button"
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
