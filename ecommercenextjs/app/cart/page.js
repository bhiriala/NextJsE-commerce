
"use client"
import CartTotal from "@/components/cart/cartTotal";
import { useSelector } from "react-redux";
import CartTable from "@/components/cart/cartTable";
import Product from "@/components/product/product";

function Cart () {
    const cart = useSelector((state) => state.cart);
    console.log('cartooo',cart)

    if (!cart) return <p>Chargement du panier...</p>;
    const products = [
        { key:5000,imageName:"/assets/produts-img/apple/apple-iphone-5s-ofic.jpg",price: 452, name: "Apple iPhone 5s", discountRate: 22, id: 1022 },
        { key:6000,imageName:"/assets/produts-img/samsung/samsung-galaxy-a10s.jpg",price: 455, name: "Samsung Galaxy A10s", discountRate: 17, id: 2004 }
    ];


    return (
    <>
        <div className="single-product-area">
            <div className="zigzag-bottom" />
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                    <div className="product-content-right">
                    <div className="woocommerce">
                        <CartTable cart={cart}/>
                        <div className="cart-collaterals">
                        <div className="cross-sells">
                            <h2>You may be interested in...</h2>
                            <ul className="products">
                                {products.map((product) => (
                                    <li className="product" key={product.id} style={{ flex: "0 0 200px" }}>
                                    <Product prod={product} img={product.imageName} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <CartTotal total={cart.total} subTotal={cart.subTotal} tax={cart.tax} />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    </>
    )
}

export default Cart;