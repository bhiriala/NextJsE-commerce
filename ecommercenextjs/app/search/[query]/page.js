import ClientSearchResult from "./clientSearchResult";

async function fetchProducts(query) {
  const response = await fetch("http://localhost:3000/products-lists", {
    cache: "no-store", 
  });
  
  if (!response.ok) {
    throw new Error("Error while fetching products");
  }

  const result = await response.json();
  console.log("Results:", result);
  console.log("Query:", decodeURIComponent(query));

  // Case 1: exact match (single word, no spaces)
  if (query && /^[^\s]+$/.test(decodeURIComponent(query))) {
    const foundData = result.find(item => 
      item.name.toLowerCase() === query.toLowerCase()
    );
    return foundData ? foundData.items : [];
  }

  // Case 2: partial match (query includes item name)
  const data = result.find(item =>
    query.toLowerCase().includes(item.name.toLowerCase())
  );

  if (!data) return [];

  // Check if any item exactly matches the query
  const foundData = data.items.find(item =>
    item.name.toLowerCase() === decodeURIComponent(query).toLowerCase()
  );

  // Return either the found item or an empty array
  return foundData ? [foundData] : []; 
}

export default async function SearchResult({ params }) {
  const query = params.query || "";
  const products = await fetchProducts(query);

  // If no products found, display a "No products found" message
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="text-gray-500 mt-2">
          Try searching with another keyword or explore our catalog.
        </p>
        <a
          href="/products"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Browse all products
        </a>
      </div>
    );
  }

  return <ClientSearchResult products={products} />;
}
