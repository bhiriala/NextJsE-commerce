import Product from "@/components/product/product";
import Title from "@/components/Title/tiltle";
async function getProductsByBrand(brandId) {
      const response = await fetch(`http://localhost:3000/products-lists/${brandId}`);
    if (!response.ok) {
        throw new Error(`Erreur lors du chargement des produits pour la marque ${brandId}`);
    }
    const products = await response.json();
    return products.items || [];
}
export default async function ProductList({ params }) {
 
    console.log("Brand:", params.brand);
    const products = await getProductsByBrand(params.brand);
    console.log("Products:", products);
    const ProductName = products[0]?.name?.split(" ")[0]?.toUpperCase();




    return (
        <div>
            <Title name={ProductName ? ProductName : "Produit introuvable"} />
            <div className="single-product-area">
                <div className="zigzag-bottom" />
                <div className="container">
                    <div className="productBrand-grid">
                        {products.length > 0 ? (
                            products.map((prod, index) => {
                                console.log("Product:", prod);
                                const i = prod.imageName.indexOf("-");
                                const substring = i !== -1 ? prod.imageName.slice(0, i) : "";
                                console.log("Image substring:", substring);
                                console.log("Image name:", prod.imageName);
                                

                                return (
                                    <Product
                                        key={index}
                                        img={`${substring}/${prod.imageName}`}
                                        price={prod.price}
                                        name={prod.name}
                                        discount={prod.discountRate}
                                        id={prod.id}
                                    />
                                );
                            })
                        ) : (
                            <p>Aucun produit disponible.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

