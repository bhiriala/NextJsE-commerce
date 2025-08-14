import ProductInList from "../Components/ProductInList/ProductInList";


async function SearchProducts(query) {
  try {
    const response = await fetch("http://localhost:3000/products-lists");
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement des produits`);
    }
    const result = await response.json();
    if (query && /^[^\s]+$/.test(query)) { 
        const foundData = result.find(item => 
            item.name.toLowerCase() === query.toLowerCase()
        );

        if (foundData) {
            return foundData.items;
        } else {
            return [];
        }
    } else {
    const data = result.find(item => query.toLowerCase().includes(item.name.toLowerCase()));
    const foundData = data.items.find(item => item.name.toLowerCase() === query.toLowerCase())
    console.log(foundData);
    // navigate(`/productDetails/${foundData.id}`)
    }
    return result;
  } catch (error) {
    console.error("Erreur :", error);
    return [];
  } 

}
export default async function SearchResult({params}) {
  const query = params.query || "";
//   const [debouncedQuery, setDebouncedQuery] = useState(query);
//   const [listProd, setListProd] = useState([]);
//   const [data, setData] = useState(null); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
const listProd = await SearchProducts(query);

  


// useEffect(() => {
//   const fetchProducts = async () => {
//       try {
//           const response = await fetch("http://localhost:3000/products-lists");
//           if (!response.ok) {
//               throw new Error(`Erreur lors du chargement des produits`);
//           }

//           const result = await response.json();
//           setData(result);

//           if (query && /^[^\s]+$/.test(query)) { 
//               const foundData = result.find(item => 
//                   item.name.toLowerCase() === query.toLowerCase()
//               );

//               if (foundData) {
//                   setListProd(foundData.items);
//               } else {
//                   setListProd([]);
//               }
//           } else {
//             const data = result.find(item => query.toLowerCase().includes(item.name.toLowerCase()));
//             const foundData = data.items.find(item => item.name.toLowerCase() === query.toLowerCase())
//             console.log(foundData);
//             navigate(`/productDetails/${foundData.id}`)
            
//           }
//       } catch (err) {
//           setError(err.message);
//       } finally {
//           setLoading(false);
//       }
//   };

//   fetchProducts();
// }, [debouncedQuery]);



//   if (loading) return <p>Chargement en cours...</p>;
//   if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="container">
      <div className="row">
        {listProd.length > 0 ? (
            listProd.map((prod, index) => {
                const i = prod.imageName.indexOf("-");
                const substring = i !== -1 ? prod.imageName.slice(0, i) : "";
                const imgName = `/src/assets/produts-img/${substring}/${prod.imageName}`;

                return (
                    <ProductInList 
                        key={index} 
                        img={imgName} 
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
  );
}
