import { Heart } from "lucide-react";
import StarRating from "./StarsRate";

export default function ProductCard({ product, wishlisted, onToggle }) {
	return (
		<div
			key={product.id}
			className='flex flex-col bg-white border border-black/10 rounded-xl overflow-hidden'>
			<div className='relative aspect-square'>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-full object-cover'
				/>
				<span className={`absolute top-2 left-2 h-6 min-w-11.25 px-2.5 flex items-center justify-center rounded-full text-xs text-white ${product.badgeType === "new" ? "bg-[#1a73e8]" : "bg-red-600"}`}>{product.badge}</span>
				<button
					type='button'
					onClick={() => onToggle(product.id)}
					className='absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors'>
					<Heart
						className='w-4 h-4'
						strokeWidth={1.5}
						stroke={wishlisted ? "#dc2626" : "currentColor"}
						fill={wishlisted ? "#dc2626" : "none"}
					/>
				</button>
			</div>
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
	);
}
