import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Components
import ProductCard from "../ProductCard";

// Images
import products from "../../data/products";

const brands = ["TechMaster", "SoundWave", "PhoneX", "OptiCam", "FashionID", "SportPro", "BrewMaster", "GlowLab"];

const ratingOptions = [5, 4, 3];

// subcomponents
function StarRating({ rating, max = 5, size = "sm" }) {
	const px = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
	return (
		<div className='flex items-center gap-0.5'>
			{Array.from({ length: max }, (_, i) => (
				<svg
					key={i}
					viewBox='0 0 24 24'
					className={px}
					fill={i < Math.floor(rating) ? "gold" : "#d1d5db"}
					stroke='none'>
					<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
				</svg>
			))}
		</div>
	);
}

// Main Page
export default function BrowseMain() {
	const [wishlisted, setWishlisted] = useState({});
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedRating, setSelectedRating] = useState(null);
	const [inStock, setInStock] = useState(false);
	const [priceMax, setPriceMax] = useState(20000000);

	const toggleWishlist = (id) => setWishlisted((prev) => ({ ...prev, [id]: !prev[id] }));

	const toggleBrand = (brand) => setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));

	return (
		<main className='max-w-7xl mx-auto px-4 mb-12'>
			{/* Breadcrumb */}
			<nav className='flex items-center gap-1 text-sm text-gray-500 mt-6 mb-6'>
				<Link
					to='/'
					className='text-gray-600 hover:text-gray-900 transition-colors'>
					Beranda
				</Link>
				<ChevronRight className='w-4 h-4 text-gray-400' />
				<span className='text-gray-400'>Toko</span>
			</nav>

			{/* Title */}
			<h1 className='text-2xl font-medium text-gray-900 leading-9 mb-6'>Semua Produk</h1>

			{/* Layout: Sidebar + Content */}
			<div className='flex gap-6 pt-6'>
				{/* ── SIDEBAR ── */}
				<aside className='w-64 shrink-0 flex flex-col gap-6'>
					{/* Harga */}
					<div>
						<h3 className='text-lg font-medium text-gray-900 mb-2'>Harga</h3>
						<input
							type='range'
							min={0}
							max={20000000}
							step={100000}
							value={priceMax}
							onChange={(e) => setPriceMax(Number(e.target.value))}
							className='w-full accent-[#1a73e8]'
						/>
						<div className='flex justify-between text-sm text-gray-500 mt-1'>
							<span>Rp 0</span>
							<span>Rp {priceMax.toLocaleString("id-ID")}</span>
						</div>
					</div>

					{/* Merek */}
					<div>
						<h3 className='text-lg font-medium text-gray-900 mb-2.5'>Merek</h3>
						<div className='flex flex-col gap-2.5'>
							{brands.map((brand) => (
								<label
									key={brand}
									className='flex items-center gap-2.5 cursor-pointer'>
									<input
										type='checkbox'
										checked={selectedBrands.includes(brand)}
										onChange={() => toggleBrand(brand)}
										className='accent-[#1a73e8] w-4 h-4'
									/>
									<span className='text-sm text-gray-500'>{brand}</span>
								</label>
							))}
						</div>
					</div>

					{/* Rating Minimum */}
					<div>
						<h3 className='text-lg font-medium text-gray-900 mb-2.5'>Rating Minimum</h3>
						<div className='flex flex-col gap-2.5'>
							{ratingOptions.map((r) => (
								<label
									key={r}
									className='flex items-center gap-2.5 cursor-pointer'>
									<input
										type='radio'
										name='rating'
										checked={selectedRating === r}
										onChange={() => setSelectedRating(r)}
										className='accent-[#1a73e8] w-4 h-4'
									/>
									<StarRating rating={r} />
									<span className='text-sm text-gray-500'>Ke atas</span>
								</label>
							))}
						</div>
					</div>

					{/* Ketersediaan */}
					<div>
						<h3 className='text-lg font-medium text-gray-900 mb-2.5'>Ketersediaan</h3>
						<label className='flex items-center gap-2.5 cursor-pointer'>
							<input
								type='checkbox'
								checked={inStock}
								onChange={() => setInStock((v) => !v)}
								className='accent-[#1a73e8] w-4 h-4'
							/>
							<span className='text-sm text-gray-500'>Stok tersedia</span>
						</label>
					</div>
				</aside>

				{/* ── CONTENT ── */}
				<div className='flex-1 flex flex-col gap-4'>
					<p className='text-sm text-gray-500'>18 produk ditemukan</p>

					{/* Product Grid */}
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								wishlisted={wishlisted[product.id]}
								onToggleWishlist={toggleWishlist}
							/>
						))}
					</div>

					{/* Load More */}
					<div className='flex justify-center py-4'>
						<button
							type='button'
							className='w-82 h-12.5 px-8 rounded-xl bg-white text-[#1a73e8] text-sm font-semibold border border-[#1a73e8] hover:bg-[#1a73e8] hover:text-white transition-colors duration-200 cursor-pointer'>
							Muat Lebih Banyak (6 produk lagi)
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
