"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, createCart } from "@/store/cartSlice"; // adapte le chemin si besoin
import AddToCartButton from "../addToCartBotton/addToCartBotton";

export default function Product(props) {
  const { prod, img } = props;
  const pathname = usePathname();
  const Tag = pathname === "/cart" ? "h3" : "h2";

  const dispatch = useDispatch();
  const storeCartId = useSelector((s) => s.cart?.cartId);
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      // cleanup si le composant est démonté pendant le timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!prod || !prod.id) return;

    // construire l'item dans le format attendu par la slice/backend
    const item = {
      id: prod.id,
      name: prod.name,
      price: Number(prod.price) || 0,
      qty: 1, // attention : la slice utilise `qty`
      imageName: prod.imageName || "",
      discountRate: Number(prod.discountRate || 0),
    };

    try {
      // récupérer cartId soit depuis le store soit depuis localStorage
      let cartId = storeCartId || (typeof window !== "undefined" ? localStorage.getItem("cartId") : null);

      // si pas de cartId, créer le panier puis utiliser l'id retourné
      if (!cartId) {
        const createResult = await dispatch(createCart()).unwrap(); // createCart retourne l'id dans notre slice
        cartId = createResult;
      }

      // dispatch addToCart avec l'objet attendu { cartId, item }
      await dispatch(addToCart({ cartId, item })).unwrap();

      // succès : feedback UI
      setAdded(true);
      timeoutRef.current = setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      console.error("Erreur ajout au panier :", err);
      // tu peux afficher une notification utilisateur ici
    }
  }, [dispatch, prod, storeCartId]);

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
       <AddToCartButton product={prod} />
      </div>
    </div>
  );
}
