import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import ProductCard from "../ProductCard";

import products from "../../data/products";
import category from "../../data/category";

const ratingOptions = [5, 4, 3];

function parsePrice(price) {
	if (!price) return 0;

	return Number(price.replace("Rp", "").replace(/\./g, "").replace(/\s/g, ""));
}

function StarRating({ rating, max = 5, size = "sm" }) {
	const px = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

	return (
		<div className='flex items-center gap-0.5'>
			{Array.from({ length: max }, (_, i) => (
				<svg
					key={i}
					viewBox='0 0 24 24'
					className={px}
					fill={i < Math.floor(rating) ? "gold" : "#d1d5db"}>
					<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
				</svg>
			))}
		</div>
	);
}

export default function BrowseMain() {
	const { slug } = useParams();

	const [wishlisted, setWishlisted] = useState({});
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedRating, setSelectedRating] = useState(null);
	const [inStock, setInStock] = useState(false);
	const [priceMax, setPriceMax] = useState(20000000);
	const [visibleProducts, setVisibleProducts] = useState(8);

	const brands = [...new Set(products.map((p) => p.brand))];

	const toggleWishlist = (id) => {
		setWishlisted((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const toggleBrand = (brand) => {
		setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
	};

	const categoriesWithCount = category.map((cat) => ({
		...cat,
		totalProduct: products.filter((product) => product.category === cat.name).length,
	}));

	const selectedCategory = categoriesWithCount.find((cat) => cat.slug === slug);

	if (!selectedCategory) {
		return (
			<div className='max-w-7xl mx-auto py-20 text-center'>
				<h1 className='text-2xl font-semibold'>Kategori tidak ditemukan</h1>
			</div>
		);
	}

	const filteredProducts = products
		.filter((product) => product.category === selectedCategory.name)
		.filter((product) => parsePrice(product.discountPrice) <= priceMax)
		.filter((product) => selectedBrands.length === 0 || selectedBrands.includes(product.brand))
		.slice(0, 4)
		.filter((product) => selectedRating === null || product.rating >= selectedRating)
		.filter((product) => !inStock || product.stock > 0);

	const displayedProducts = filteredProducts.slice(0, visibleProducts);

	const remainingProducts = filteredProducts.length - visibleProducts;

	return (
		<main className='max-w-7xl mx-auto px-4 mb-12'>
			<nav className='flex items-center gap-1 text-sm text-gray-500 mt-6 mb-6'>
				<Link
					to='/'
					className='text-gray-600 hover:text-gray-900'>
					Beranda
				</Link>

				<ChevronRight className='w-4 h-4' />

				<span>{selectedCategory.name}</span>
			</nav>

			<h1 className='text-2xl font-medium mb-6'>{selectedCategory.name}</h1>

			{/* Harga */}
			<div className='flex gap-6'>
				<aside className='w-64 shrink-0 flex flex-col gap-6'>
					<div>
						<h3 className='font-medium mb-2'>Harga</h3>

						<input
							type='range'
							min='0'
							max='20000000'
							step='100000'
							value={priceMax}
							onChange={(e) => setPriceMax(Number(e.target.value))}
							className='w-full'
						/>

						<div className='flex justify-between text-sm'>
							<span>Rp 0</span>

							<span>Rp {priceMax.toLocaleString("id-ID")}</span>
						</div>
					</div>

					{/* Merek */}
					<div>
						<h3 className='font-medium mb-2'>Merek</h3>

						<div className='flex flex-col gap-2'>
							{brands.map((brand) => (
								<label
									key={brand}
									className='flex items-center gap-2'>
									<input
										type='checkbox'
										checked={selectedBrands.includes(brand)}
										onChange={() => toggleBrand(brand)}
									/>

									<span>{brand}</span>
								</label>
							))}
						</div>
					</div>

					{/* Rating */}
					<div>
						<h3 className='font-medium mb-2'>Rating Minimum</h3>

						<div className='flex flex-col gap-2'>
							{ratingOptions.map((rating) => (
								<label
									key={rating}
									className='flex items-center gap-2'>
									<input
										type='radio'
										name='rating'
										checked={selectedRating === rating}
										onChange={() => setSelectedRating(rating)}
									/>

									<StarRating rating={rating} />

									<span>Ke atas</span>
								</label>
							))}
						</div>
					</div>

					{/* Stock */}
					<div>
						<h3 className='font-medium mb-2'>Ketersediaan</h3>

						<label className='flex items-center gap-2'>
							<input
								type='checkbox'
								checked={inStock}
								onChange={() => setInStock((prev) => !prev)}
							/>

							<span>Stok tersedia</span>
						</label>
					</div>
				</aside>

				<div className='flex-1'>
					<p className='text-sm text-gray-500 mb-4'>{filteredProducts.length} produk</p>

					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
						{displayedProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								wishlisted={wishlisted[product.id]}
								onToggleWishlist={toggleWishlist}
							/>
						))}
					</div>

					{remainingProducts > 0 && (
						<div className='flex justify-center mt-8'>
							<button
								onClick={() => setVisibleProducts((prev) => prev + 8)}
								className='px-8 py-3 border border-blue-500 text-blue-500 rounded-lg'>
								Muat Lebih Banyak ({remainingProducts} produk lagi)
							</button>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
