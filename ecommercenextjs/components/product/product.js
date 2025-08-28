import Image from "next/image";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import AddToCartButton from "../addToCartBotton/addToCartBotton";

export default function Product(props) {
  const { prod, img } = props;
  // const pathname = usePathname();
  // const Tag = pathname === "/cart" ? "h3" : "h2";


  return (
    <div className="single-shop-product">
        <Image
          src={img}
          alt={prod?.name || "product"}
          width={160}
          height={160}
          loading="lazy"
        />

      {/* <Tag> */}
        <Link
          href={`/productDetails/${prod?.id}`}
          
        >
          {prod?.name}
        </Link>
      {/* </Tag> */}

      <div className="product-carousel-price">
        <ins >
          ${((prod?.price || 0) * (1 - ((prod?.discountRate || 0) / 100))).toFixed(2)}
        </ins>
        <del>${(prod?.price || 0).toFixed(2)}</del>

        {/* {pathname === "/cart" ? null : <del>${(prod?.price || 0).toFixed(2)}</del>} */}
      </div>
       <AddToCartButton product={prod} />
    </div>
  );
}
