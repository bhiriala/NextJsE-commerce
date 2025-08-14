"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./searchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/cart" || pathname === "/checkout") return null;
  console.log(query)

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search/${encodeURIComponent(q)}`);
    setQuery("");
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search products..."
      />
      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  );
}
