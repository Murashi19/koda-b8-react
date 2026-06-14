import { useState, useEffect } from "react";
import { Zap, Clock, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../../data/products.js";

// Render bintang berdasarkan rating
function StarRating({ rating, max = 5 }) {
	return (
		<div className='flex items-center gap-0.5'>
			{Array.from({ length: max }, (_, i) => {
				const filled = i < Math.floor(rating);
				return (
					<svg
						key={i}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						className='w-3.5 h-3.5'
						fill={filled ? "gold" : "#d1d5db"}
						stroke='none'>
						<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
					</svg>
				);
			})}
		</div>
	);
}

// Countdown timer — mulai dari 5 jam 21 menit 38 detik
const Timer = 5 * 3600 + 21 * 60 + 38;

function useCountdown(initialSeconds) {
	const [seconds, setSeconds] = useState(initialSeconds);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((s) => (s > 0 ? s - 1 : 0));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
	const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
	const s = String(seconds % 60).padStart(2, "0");
	return { h, m, s };
}

export default function FlashDeal() {
	const { h, m, s } = useCountdown(Timer);
	const [wishlisted, setWishlisted] = useState({});

	const toggleWishlist = (id) => setWishlisted((prev) => ({ ...prev, [id]: !prev[id] }));
	const flashProducts = products.filter((p) => p.tags.includes("flash"));
	return (
		<section className='max-w-7xl mx-auto px-4 flex flex-col gap-4'>
			{/* Header */}
			<div className='flex items-center justify-between mb-2'>
				<div className='flex items-center gap-4'>
					{/* Label Flash Deal */}
					<div className='flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg'>
						<Zap
							className='w-4 h-4'
							strokeWidth={1.5}
						/>
						<span className='text-sm font-semibold'>Flash Deal</span>
					</div>

					{/* Timer */}
					<div className='flex items-center gap-1 text-sm text-gray-500'>
						<Clock
							className='w-3.5 h-3.5'
							strokeWidth={1.5}
						/>
						<span>Berakhir dalam:</span>
						<span className='font-medium tabular-nums'>
							{h} : {m} : {s}
						</span>
					</div>
				</div>

				<Link
					to='#'
					className='flex items-center gap-1 text-sm text-[#1a73e8] hover:underline'>
					Lihat Semua
					<ArrowRight className='w-3.5 h-3.5' />
				</Link>
			</div>

			{/* Product Grid */}
			<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{flashProducts.map((product) => (
					<div
						key={product.id}
						className='flex flex-col bg-white border border-black/10 rounded-xl overflow-hidden pb-2.5'>
						{/* Image Area */}
						<div className='relative w-full h-max bg-gray-100'>
							<img
								src={product.image}
								alt={product.name}
								className='w-full h-full object-cover'
							/>

							{/* Badge diskon */}
							<span className='absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-xl'>{product.badge}</span>

							{/* Wishlist */}
							<button
								type='button'
								onClick={() => toggleWishlist(product.id)}
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
						<div className='flex flex-col gap-2 px-3 pt-3'>
							<p className='text-xs text-gray-500'>{product.brand}</p>
							<p className='text-sm font-medium text-gray-900 leading-snug'>{product.name}</p>

							{/* Rating */}
							<div className='flex items-center gap-1'>
								<StarRating rating={product.rating} />
								<span className='text-sm text-gray-700'>{product.rating}</span>
								<span className='text-xs text-gray-500'>({product.review})</span>
							</div>

							{/* Price */}
							<div className='flex items-center gap-1.5'>
								<span className='text-base font-semibold text-[#1a73e8]'>{product.discountPrice}</span>
								<span className='text-xs text-gray-500 line-through'>{product.regularPrice}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
