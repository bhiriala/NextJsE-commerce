"use client";
import { useEffect } from "react";

export default function SaveRecentlyViewed({ product }) {
  useEffect(() => {
    if (product) {
      let recentlyViewed = [];
        const stored = localStorage.getItem("RecentlyViewed");
        if (stored) {
            try {
                recentlyViewed = JSON.parse(stored);
                if (!Array.isArray(recentlyViewed)) {
                    recentlyViewed = [];
                }
            } catch (error) {
                console.error("Erreur lors du parsing du localStorage :", error);
                recentlyViewed = [];
            }
        }
        recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);
        recentlyViewed.unshift(product);
        localStorage.setItem("RecentlyViewed", JSON.stringify(recentlyViewed));
    }
  }, [product]);

  return null;
}
