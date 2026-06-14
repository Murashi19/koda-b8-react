import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../../data/products.js";

function StarRating({ rating, max = 5 }) {
	return (
		<div className='flex items-center gap-0.5'>
			{Array.from({ length: max }, (_, i) => (
				<svg
					key={i}
					viewBox='0 0 24 24'
					className='w-3.5 h-3.5'
					fill={i < Math.floor(rating) ? "gold" : "#d1d5db"}
					stroke='none'>
					<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
				</svg>
			))}
		</div>
	);
}

export default function BestProduct() {
	const [wishlisted, setWishlisted] = useState({});
	const toggle = (id) => setWishlisted((prev) => ({ ...prev, [id]: !prev[id] }));

	const bestProducts = products.filter((p) => p.tags.includes("best"));

	return (
		<div className='max-w-7xl mx-auto px-4 flex flex-col gap-10'>
			{/* ===== BEST PRODUCT SECTION ===== */}
			<section className='flex flex-col gap-4'>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<h2 className='text-xl font-medium text-gray-900 leading-7.5'>Produk Unggulan</h2>
					<Link
						to='#'
						className='flex items-center gap-1 text-sm text-[#1a73e8] hover:underline'>
						Lihat Semua
						<ArrowRight className='w-3.5 h-3.5' />
					</Link>
				</div>

				{/* Product Grid */}
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
					{bestProducts.map((product) => (
						<div
							key={product.id}
							className='flex flex-col bg-white border border-black/10 rounded-xl overflow-hidden'>
							{/* Image */}
							<div className='relative aspect-square'>
								<img
									src={product.image}
									alt={product.name}
									className='w-full h-full object-cover'
								/>
								<span className='absolute top-2 left-2 h-6 min-w-11.25 px-2.5 flex items-center justify-center rounded-full text-xs text-white bg-red-600'>{product.badge}</span>
								<button
									type='button'
									onClick={() => toggle(product.id)}
									aria-label='Tambah ke wishlist'
									className='absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors'>
									<Heart
										className='w-4 h-4'
										strokeWidth={1.5}
										stroke={wishlisted[product.id] ? "#dc2626" : "currentColor"}
										fill={wishlisted[product.id] ? "#dc2626" : "none"}
									/>
								</button>
							</div>

							{/* Content */}
							<div className='flex flex-col gap-2 p-3'>
								<p className='text-xs text-gray-500'>{product.brand}</p>
								<p className='text-sm font-medium text-gray-900 leading-snug'>{product.name}</p>
								<div className='flex items-center gap-1'>
									<StarRating rating={product.rating} />
									<span className='text-sm text-gray-700'>{product.rating}</span>
									<span className='text-xs text-gray-500'>({product.review})</span>
								</div>
								<div className='flex items-center gap-1.5'>
									<span className='text-base font-semibold text-[#1a73e8]'>{product.discountPrice}</span>
									{product.regularPrice && <span className='text-xs text-gray-500 line-through'>{product.regularPrice}</span>}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
