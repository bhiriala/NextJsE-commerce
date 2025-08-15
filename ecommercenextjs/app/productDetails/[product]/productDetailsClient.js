import Link from "next/link";
import TopServer from "@/components/top/topServer";
import img1 from "../../../assets/img/product-thumb-1.jpg";
import img2 from "../../../assets/img/product-thumb-2.jpg";
import img3 from "../../../assets/img/product-thumb-3.jpg";
import Image from "next/image";
// import { useState } from "react";

export default function ProductDetailsClient({ product, imagePath }) {
//   const [quantity, setQuantity] = useState(1);

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <TopServer name="Recently Viewed" api="http://localhost:3000/top-new-products" />
            <div className="single-sidebar">
              <h2 className="sidebar-title" style={{ marginTop: "3rem" }}>Others brands</h2>
              <ul>
                <li><Link href={`/products/50`}>Sony</Link></li>
                <li><Link href={`/products/20`}>Samsung</Link></li>
                <li><Link href={`/products/30`}>LG</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-md-8">
            <div className="product-content-right">
              <div className="product-breadcroumb">
                <a href="#">Home</a>
                <a href="#">Category Name</a>
                <a href="#">Sony Smart TV - 2015</a>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="product-images">
                    <div className="product-main-img">
                      <Image
                        src={imagePath || img1}
                        alt="Product"
                        width={210}
                        height={210}
                        unoptimized
                      />
                    </div>
                    <div className="product-gallery">
                      <Image src={img1} alt="Gallery 1" width={80} height={80} />
                      <Image src={img2} alt="Gallery 2" width={80} height={80} />
                      <Image src={img3} alt="Gallery 3" width={80} height={80} />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6" >
                  <div className="product-inner">
                    <h2 className="product-name">{product.name}</h2>
                    <div className="product-inner-price">
                      <ins>${(product.price * (1 - (product.discountRate / 100))).toFixed(2)}</ins>
                      <del>${product.price}</del>
                    </div>
                    <form className="cart" >
                      {/* <div className="quantity">
                        <input
                          type="number"
                          size={4}
                          className="input-text qty text"
                          title="Qty"
                          value={quantity}
                          min={1}
                          step={1}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                      </div> */}
                      <button type="button" className="add_to_cart_button">
                        Add to cart
                      </button>
                    </form>

                    <div className="product-inner-category">
                      <h2>Product Description</h2>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
