import ProductDetailsClient from "./productDetailsClient";

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

  return <ProductDetailsClient product={product} imagePath={imagePath} />;
}
