import TopClient from "./topClient";

export default async function TopServer({ name, api }) {
  let listProd = [];

  if (name !== "Recently Viewed") {
    const res = await fetch(api, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Erreur lors du chargement du ${name}`);
    }
    listProd = await res.json();
  } else {
    listProd = [];
  }

  return <TopClient name={name} listProd={listProd} />;
}
