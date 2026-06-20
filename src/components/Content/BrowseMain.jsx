import { useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import ProductCard from "../ProductCard";
import BrowseFilter from "../BrowseFilter";

import useProductFilter from "../../hooks/useProductFilter";
import usePagination from "../../hooks/usePagination";

import products from "../../data/products";
import category from "../../data/category";

export default function BrowseMain() {
	const { slug } = useParams();

	const [wishlisted, setWishlisted] = useState({});

	const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], []);

	const categoriesWithCount = useMemo(
		() =>
			category.map((cat) => ({
				...cat,
				totalProduct: products.filter((product) => product.category === cat.name).length,
			})),
		[],
	);

	const selectedCategory = categoriesWithCount.find((cat) => cat.slug === slug);

	const { filteredProducts, selectedBrands, setSelectedBrands, selectedRating, setSelectedRating, inStock, setInStock, priceMax, setPriceMax } = useProductFilter(products, selectedCategory?.name);

	const { currentPage, setCurrentPage, totalPages, displayedData } = usePagination(filteredProducts, 16);

	useEffect(() => {
		setCurrentPage(1);
	}, [slug, selectedBrands, selectedRating, inStock, priceMax, setCurrentPage]);

	const toggleWishlist = (id) => {
		setWishlisted((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const toggleBrand = (brand) => {
		setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
	};

	if (slug && !selectedCategory) {
		return (
			<div className='max-w-7xl mx-auto py-20 text-center'>
				<h1 className='text-2xl font-semibold'>Kategori tidak ditemukan</h1>
			</div>
		);
	}

	return (
		<main className='max-w-7xl mx-auto px-4 mb-12'>
			<nav className='flex items-center gap-1 text-sm text-gray-500 mt-6 mb-6'>
				<Link
					to='/'
					className='text-gray-600 hover:text-gray-900'>
					Beranda
				</Link>

				<ChevronRight className='w-4 h-4' />

				<span>{slug ? selectedCategory?.name : "Semua Produk"}</span>
			</nav>

			<h1 className='text-2xl font-medium mb-6'>{slug ? selectedCategory?.name : "Semua Produk"}</h1>

			<div className='flex gap-6'>
				<BrowseFilter
					brands={brands}
					selectedBrands={selectedBrands}
					toggleBrand={toggleBrand}
					selectedRating={selectedRating}
					setSelectedRating={setSelectedRating}
					inStock={inStock}
					setInStock={setInStock}
					priceMax={priceMax}
					setPriceMax={setPriceMax}
				/>

				<div className='flex-1'>
					<p className='text-sm text-gray-500 mb-4'>{filteredProducts.length} produk</p>

					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
						{displayedData.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								wishlisted={wishlisted[product.id]}
								onToggleWishlist={toggleWishlist}
							/>
						))}
					</div>

					{totalPages > 1 && (
						<div className='flex justify-center items-center gap-2 mt-8 flex-wrap'>
							<button
								onClick={() => setCurrentPage((prev) => prev - 1)}
								disabled={currentPage === 1}
								className='px-4 py-2 border rounded-lg disabled:opacity-50'>
								Prev
							</button>

							{Array.from({ length: totalPages }, (_, index) => (
								<button
									key={index}
									onClick={() => setCurrentPage(index + 1)}
									className={`px-4 py-2 border rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`}>
									{index + 1}
								</button>
							))}

							<button
								onClick={() => setCurrentPage((prev) => prev + 1)}
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
