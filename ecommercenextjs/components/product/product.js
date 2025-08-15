'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Product(props) {
    console.log("Product props:", props.prod);
   const addRecentlyViewed = (product) => {
        let recentlyViewed = [];
        const stored = localStorage.getItem("RecentlyViewed");
        if (stored) {
            try {
                recentlyViewed = JSON.parse(stored);
                if (!Array.isArray(recentlyViewed)) {
                    recentlyViewed = [];
                }
            } catch (error) {
                console.error("Erreur lors du parsing du localStorage :", error);
                recentlyViewed = [];
            }
        }
        recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);
        recentlyViewed.unshift(product);
        localStorage.setItem("RecentlyViewed", JSON.stringify(recentlyViewed));
    };
    const pathname = usePathname();
    const Tag = pathname === "/cart" ? "h3" : "h2";
    return(
            <div className="single-shop-product">
                <div className={pathname === "/cart" ?"attachment-shop_catalog wp-post-image" : "product-upper"}>
                    <Image
                        src={props.img}
                        alt={props.prod.name}
                        width={160}   
                        height={160} 
                    />
                </div>
                <Tag>
                    <Link
                        href={`/productDetails/${props.prod.id}`}
                        style={{ color: pathname === "/cart" ? "black" : "" }}
                        onClick={() => addRecentlyViewed(props.prod)}
                    >
                        {props.prod.name}
                    </Link>

                </Tag>
                <div className={pathname === "/cart" ? "price" :"product-carousel-price"}>
                    <ins className={pathname === "/cart" ? "amount" : ""}>${(props.prod.price * (1 - (props.prod.discountRate / 100))).toFixed(2)}</ins> {pathname === "/cart" ? <></>:<del>${props.prod.price.toFixed(2)}</del>}
                </div>
                <div className={pathname === "/cart" ? "" : "product-option-shop"}>
                    <button className="add_to_cart_button" >
                        Add to cart
                    </button>
                </div>
            </div>
        
    )
    
}
