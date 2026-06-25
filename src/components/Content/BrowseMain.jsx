import { useEffect, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import ProductCard from "../ProductCard";
import BrowseFilter from "../BrowseFilter";

import useProductFilter from "../../hooks/useProductFilter";
import usePagination from "../../hooks/usePagination";

import products from "../../data/products";
import category from "../../data/category";

export default function BrowseMain() {
	const { slug } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	// Baca semua filter dari URL
	const searchQuery = searchParams.get("q") ?? "";
	const selectedBrands = searchParams.getAll("brand");
	const selectedRating = Number(searchParams.get("rating")) || null;
	const inStock = searchParams.get("stock") === "1";
	const priceMax = Number(searchParams.get("priceMax")) || 20000000;
	const currentPage = Number(searchParams.get("page")) || 1;

	// Set Filter
	const setParam = (updates) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			Object.entries(updates).forEach(([key, value]) => {
				if (value === null || value === undefined || value === "") {
					next.delete(key);
				} else {
					next.set(key, value);
				}
			});
			return next;
		});
	};

	// brand pakai getAll jadi perlu helper khusus
	const toggleBrand = (brand) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			const current = next.getAll("brand");
			next.delete("brand");
			const updated = current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand];
			updated.forEach((b) => next.append("brand", b));
			next.set("page", "1");
			return next;
		});
	};

	// const setCurrentPage = (page) => {
	// 	const val = typeof page === "function" ? page(currentPage) : page;
	// 	setParam({ page: val });
	// };

	// Data
	const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], []);

	const categoriesWithCount = useMemo(
		() =>
			category.map((cat) => ({
				...cat,
				totalProduct: products.filter((p) => p.category === cat.name).length,
			})),
		[],
	);

	const selectedCategory = categoriesWithCount.find((cat) => cat.slug === slug);

	const { filteredProducts } = useProductFilter(products, selectedCategory?.name, searchQuery, selectedBrands, selectedRating, inStock, priceMax);

	const { totalPages, displayedData, setCurrentPage } = usePagination(filteredProducts, 16, currentPage);
	useEffect(() => {
		setCurrentPage(1);
	}, [filteredProducts, setCurrentPage]);

	// Reset ke page 1 kalau filter berubah (kecuali page itu sendiri)
	useEffect(() => {
		setParam({ page: "1" });
	}, [slug, searchQuery]);

	if (slug && !selectedCategory) {
		return (
			<div className='max-w-7xl mx-auto py-20 text-center'>
				<h1 className='text-2xl font-semibold'>Kategori tidak ditemukan</h1>
			</div>
		);
	}

	const pageTitle = searchQuery ? `Hasil pencarian untuk "${searchQuery}"` : slug ? selectedCategory?.name : "Semua Produk";

	return (
		<main className='max-w-7xl mx-auto px-4 mb-12'>
			<nav className='flex items-center gap-1 text-sm text-gray-500 mt-6 mb-6'>
				<Link
					to='/'
					className='text-gray-600 hover:text-gray-900'>
					Beranda
				</Link>
				<ChevronRight className='w-4 h-4' />
				<span>{searchQuery ? "Hasil Pencarian" : slug ? selectedCategory?.name : "Semua Produk"}</span>
			</nav>

			<h1 className='text-2xl font-medium mb-6'>{pageTitle}</h1>

			<div className='flex gap-6'>
				<BrowseFilter
					brands={brands}
					selectedBrands={selectedBrands}
					onBrandChange={toggleBrand}
					selectedRating={selectedRating}
					onRatingChange={(val) => setParam({ rating: val === selectedRating ? null : val, page: "1" })}
					inStock={inStock}
					onStockChange={() => setParam({ stock: inStock ? null : "1", page: "1" })}
					priceMax={priceMax}
					onPriceChange={(val) => setParam({ priceMax: val === 20000000 ? null : val, page: "1" })}
					setCurrentPage={setCurrentPage}
				/>

				<div className='flex-1'>
					<p className='text-sm text-gray-500 mb-4'>{filteredProducts.length} produk</p>

					{filteredProducts.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-20 text-center gap-2'>
							<p className='text-gray-500 text-sm'>{searchQuery ? `Tidak ada produk yang cocok dengan "${searchQuery}".` : "Tidak ada produk yang cocok dengan filter ini."}</p>
						</div>
					) : (
						<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
							{displayedData.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))}
						</div>
					)}

					{totalPages > 1 && (
						<div className='flex justify-center items-center gap-2 mt-8 flex-wrap'>
							<button
								onClick={() => setCurrentPage((p) => p - 1)}
								disabled={currentPage === 1}
								className='px-4 py-2 border rounded-lg disabled:opacity-50'>
								Prev
							</button>
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i}
									onClick={() => setCurrentPage(i + 1)}
									className={`px-4 py-2 border rounded-lg ${currentPage === i + 1 ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`}>
									{i + 1}
								</button>
							))}
							<button
								onClick={() => setCurrentPage((p) => p + 1)}
								disabled={currentPage === totalPages}
								className='px-4 py-2 border rounded-lg disabled:opacity-50'>
								Next
							</button>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
