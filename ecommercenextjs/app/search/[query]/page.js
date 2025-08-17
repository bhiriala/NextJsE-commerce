import ClientSearchResult from "./clientSearchResult";

async function fetchProducts(query) {
  const response = await fetch("http://localhost:3000/products-lists", {
    cache: "no-store", 
  });
  
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des produits");
  }
  const result = await response.json();
  console.log("results:", result);
  console.log("Query:", decodeURIComponent(query));
  if (query && /^[^\s]+$/.test(decodeURIComponent(query))) {
    console.log("khraaa")
    const foundData = result.find(item => 
      item.name.toLowerCase() === query.toLowerCase()
    );
    console.log("results:", result);
    // console.log("Found data:", foundData);
    return foundData ? foundData.items : [];
  }
  console.log("heloooo")
  const data = result.find(item =>
    query.toLowerCase().includes(item.name.toLowerCase())
  );
  console.log("Data:", data);
  if (!data) return null;

  const foundData = data.items.find(item =>
    item.name.toLowerCase() === decodeURIComponent(query).toLowerCase()
  );
  console.log("Found data:", foundData);
  return foundData ? [foundData] : []; 
}


export default async function SearchResult({ params }) {
  const query = params.query || "";
  const products = await fetchProducts(query);
  console.log("ahawaaaa",products)
  return <ClientSearchResult products={products} />;
}
