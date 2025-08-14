// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../Redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Product(props) {
    // const dispatch = useDispatch();
    // const location = useLocation();
    // const { cartId, cartData } = useSelector((state) => state.cart);

    // const handleAddToCart = () => {
    //     const newItem = {
    //         id: props.id,
    //         name: props.name,
    //         imageName: props.img,
    //         price: props.price,
    //         qty: 1,
    //         discountRate:props.discount
    //     };

    //     dispatch(addToCart({ cartId, item: newItem }));
    // };
// jai pas fais la mise à jour du serveur dans handleAddToCart car la mise à 
// jour du serveur s'execute directement avant que dispatch add to cart
//  ne compléte son execution du coup la mise à jour du serveur se fais avec 
// la meme cart et pas la nouvelle cart et c pour ca j'ai utilisé useEffect qui va mettre 
//à jour le serveur chaque fois que la cart change 
    // useEffect(() => {
    //     const updateCart = async () => {
    //         if (cartId && cartData) {
    //             try {
    //                 const response = await fetch(`http://localhost:3000/carts/${cartId}`, {
    //                     method: "PUT",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify(cartData),
    //                 });

    //                 if (!response.ok) {
    //                     throw new Error("Erreur lors de la mise à jour du panier");
    //                 }

    //                 const data = await response.json();
    //                 console.log("Panier mis à jour:", data);
    //             } catch (error) {
    //                 console.error("Erreur lors de la mise à jour du panier:", error);
    //             }
    //         }
    //     };

    //     updateCart();
    // }, [cartData, cartId]);
    const pathname = usePathname();
    const Tag = pathname === "/cart" ? "h3" : "h2";

    
    return(
        <div className={pathname === "/cart" ?"": "col-md-3 col-sm-6"}>
            <div className="single-shop-product">
                <div className={pathname === "/cart" ?"attachment-shop_catalog wp-post-image" : "product-upper"}>
                    <Image  src={props.img} alt={props.name} />
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
                    <button className="add_to_cart_button" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
    


    
}
