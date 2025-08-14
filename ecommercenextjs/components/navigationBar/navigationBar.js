import Navbar from "./nav";

async function getCategories() {
  try {
    const response = await fetch("http://localhost:3000/categories");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des catégories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur :", error);
    return [];
  }
    
}

export default async function NavigationBar() {
    const categories = await getCategories();

    return (
        <Navbar categories={categories} />
    );
}