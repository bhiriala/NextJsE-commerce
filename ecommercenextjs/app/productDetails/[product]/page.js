import Link from "next/link";
import TopServer from "@/components/top/topServer";
import img1 from "../../../assets/img/product-thumb-1.jpg";
import img2 from "../../../assets/img/product-thumb-2.jpg";
import img3 from "../../../assets/img/product-thumb-3.jpg";
import Image from "next/image";
import SaveRecentlyViewed from "@/components/SaveRecentlyViewed/SaveRecentlyViewed";
import AddToCartButton from "@/components/addToCartBotton/addToCartBotton";

async function getProductDetails(productId) {
  const response = await fetch(`http://localhost:3000/products/${productId}`);
  if (!response.ok) {
    throw new Error(`Erreur lors du chargement du produit avec l'ID ${productId}`);
  }

  const product = await response.json();

  let imagePath = null;
  if (product.imageName) {
    const i = product.imageName.indexOf("-");
    const substring = i !== -1 ? product.imageName.slice(0, i) : "";
    imagePath = `/assets/produts-img/${substring}/${product.imageName}`;
  }

  return { product, imagePath };
}

export default async function ProductDetails({ params }) {
  const id = params.product;
  const { product, imagePath } = await getProductDetails(id);

  console.log("Product Details:", product);



  return (
    <div className="single-product-area">
      <SaveRecentlyViewed product={product} />
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
                      <AddToCartButton product={product} img={imagePath || null} />
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
