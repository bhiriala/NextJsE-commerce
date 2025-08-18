"use client";

import CartTotal from "@/components/cart/cartTotal";
import { useSelector } from "react-redux";
import CartTable from "@/components/cart/cartTable";
import Product from "@/components/product/product";

function Cart() {
  const { cartData, loading, error } = useSelector((state) => state.cart || {});
  console.log("cartooooo",cartData)

  const products = [
    { id: 1022, imageName: "/assets/produts-img/apple/apple-iphone-5s-ofic.jpg", price: 452, name: "Apple iPhone 5s", discountRate: 22 },
    { id: 2004, imageName: "/assets/produts-img/samsung/samsung-galaxy-a10s.jpg", price: 455, name: "Samsung Galaxy A10s", discountRate: 17 },
  ];

  if (loading) return <p>Chargement du panier...</p>;
  if (error) return <p>Erreur lors du chargement du panier : {String(error)}</p>;

  if (!cartData) return <p>Votre panier est vide ou en cours de création...</p>;

  return (
    <>
      <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
              <div className="product-content-right">
                <div className="woocommerce">
                  {/* On passe cartData à CartTable (adapter selon la signature de ton composant CartTable) */}
                  <CartTable cart={cartData} />

                  <div className="cart-collaterals">
                    <div className="cross-sells">
                      <h2>You may be interested in...</h2>
                      <ul className="products" style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 0 }}>
                        {products.map((product) => (
                          <li className="product" key={product.id} style={{ flex: "0 0 200px", listStyle: "none" }}>
                            <Product prod={product} img={product.imageName} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CartTotal attend probablement total / subTotal / tax — on lit depuis cartData */}
                    <CartTotal
                      total={cartData?.total ?? 0}
                      subTotal={cartData?.subTotal ?? cartData?.total ?? 0}
                      tax={cartData?.tax ?? 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          
      </div> 
    </>
  );
}

export default Cart;
