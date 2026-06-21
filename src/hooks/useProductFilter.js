import { useState, useMemo } from "react";

function parsePrice(price) {
    if (!price) return 0;

    return Number(price.replace("Rp", "").replace(/\./g, "").replace(/\s/g, ""));
}

function filterProducts(products, filters) {
    return products
        .filter((product) =>
            !filters.category
                ? true
                : product.category === filters.category
        )
        .filter(
            (product) =>
                parsePrice(product.discountPrice) <= filters.priceMax
        )
        .filter(
            (product) =>
                filters.selectedBrands.length === 0 ||
                filters.selectedBrands.includes(product.brand)
        )
        .filter(
            (product) =>
                filters.selectedRating === null ||
                product.rating >= filters.selectedRating
        )
        .filter(
            (product) =>
                !filters.inStock || product.stock > 0
        )
        .filter((product) => {
            if (!filters.searchQuery) return true;

            const query = filters.searchQuery.toLowerCase().trim();
            return (
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        });
}

export default function useProductFilter(products, category, searchQuery = "") {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [inStock, setInStock] = useState(false);
    const [priceMax, setPriceMax] = useState(20000000);

    const filteredProducts = useMemo(() => {
        return filterProducts(products, {
            category,
            selectedBrands,
            selectedRating,
            inStock,
            priceMax,
            searchQuery,
        });
    }, [
        products,
        category,
        selectedBrands,
        selectedRating,
        inStock,
        priceMax,
        searchQuery,
    ]);

    return {
        filteredProducts,
        selectedBrands,
        setSelectedBrands,
        selectedRating,
        setSelectedRating,
        inStock,
        setInStock,
        priceMax,
        setPriceMax,
    };
}