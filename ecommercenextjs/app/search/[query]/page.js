import Link from "next/link";
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

  if (query && /^[^\s]+$/.test(decodeURIComponent(query))) {
    const foundData = result.find(item => 
      item.name.toLowerCase() === query.toLowerCase()
    );
    return foundData ? foundData.items : [];
  }

  const data = result.find(item =>
    query.toLowerCase().includes(item.name.toLowerCase())
  );

  if (!data) return [];
  const foundData = data.items.find(item =>
    item.name.toLowerCase() === decodeURIComponent(query).toLowerCase()
  );
  return foundData ? [foundData] : []; 
}

export default async function SearchResult({ params }) {
  const query = params.query || "";
  const products = await fetchProducts(query);
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="text-gray-500 mt-2">
          Try searching with another keyword.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go back home.
        </Link>
      </div>
    );
  }

  return <ClientSearchResult products={products} />;
}
