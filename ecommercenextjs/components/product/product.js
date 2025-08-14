'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Product(props) {
    const pathname = usePathname();
    const Tag = pathname === "/cart" ? "h3" : "h2";
    const imgPath = require(`../../assets/produts-img/${props.img}`);

    
    return(
        <div className={pathname === "/cart" ?"": "col-md-3 col-sm-6"}>
            <div className="single-shop-product">
                <div className={pathname === "/cart" ?"attachment-shop_catalog wp-post-image" : "product-upper"}>
                    <Image  src={imgPath} alt={props.name} />
                </div>
                <Tag>
                    <Link 
                        style={{ color: pathname === "/cart" ? "black" : "" }} 
                        href={`/productDetails/${props.id}`}
                    >
                        {props.name}
                    </Link>
                </Tag>
                <div className={pathname === "/cart" ? "price" :"product-carousel-price"}>
                    <ins className={pathname === "/cart" ? "amount" : ""}>${(props.price * (1 - (props.discount / 100))).toFixed(2)}</ins> {pathname === "/cart" ? <></>:<del>${props.price.toFixed(2)}</del>}
                </div>
                <div className={pathname === "/cart" ? "" : "product-option-shop"}>
                    <button className="add_to_cart_button" >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
    
}
