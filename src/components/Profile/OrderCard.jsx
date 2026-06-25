import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { CircleCheckBig, Truck } from "lucide-react";

function StatusBadge({ status }) {
	if (status === "sent") {
		return (
			<span className='flex items-center gap-1.5 bg-gray-200 rounded-full px-3 py-1 text-xs text-green-600'>
				<CircleCheckBig
					className='w-3 h-3 text-green-600'
					strokeWidth={2}
				/>
				Terkirim
			</span>
		);
	}
	return (
		<span className='flex items-center gap-1.5 bg-gray-200 rounded-full px-3 py-1 text-xs text-[#1a73e8]'>
			<Truck
				className='w-3 h-3 text-[#1a73e8]'
				strokeWidth={2}
			/>
			Dikirim
		</span>
	);
}

export default function OrderCard({ order }) {
	const navigate = useNavigate();

	const displayId = order.orderId ?? order.id;

	return (
		<div className='w-full flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5'>
			{/* Header */}
			<div className='flex justify-between items-start'>
				<div className='flex flex-col gap-0.5'>
					<h3 className='text-base font-medium text-gray-900'>#{displayId}</h3>
					<span className='text-xs text-gray-500'>{order.date}</span>
				</div>
				<StatusBadge status={order.status} />
			</div>

			{/* Products */}
			{order.products.map((p, i) => (
				<div
					key={i}
					className='flex items-center gap-3'>
					<img
						src={p.img}
						alt={p.name}
						className='w-12 h-12 rounded-lg object-cover'
					/>
					<div className='flex flex-col'>
						<h3 className='text-base font-medium text-gray-900'>{p.name}</h3>
						<span className='text-xs text-gray-500'>
							×{p.qty} · {p.price}
						</span>
					</div>
				</div>
			))}

			{/* Footer */}
			<div className='flex justify-between items-end pt-3 border-t border-black/10'>
				<div className='flex items-center gap-1.5'>
					<span className='text-sm text-gray-500'>Total:</span>
					<span className='text-sm text-[#1a73e8]'>{order.total}</span>
				</div>
				<div className='flex items-center gap-3'>
					<button
						onClick={() => navigate(`#`)} ///track/${displayId}
						className='text-sm text-[#1a73e8] border border-[#1a73e8] rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors'>
						Lacak
					</button>
					{order.canReview && (
						<button
							onClick={() => navigate(`#`)} ///review/${displayId}
							className='flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg px-3 py-1.5 transition-colors'>
							<Star
								className='w-3 h-3'
								strokeWidth={2}
							/>
							Beri Ulasan
						</button>
					)}
					<button className='text-sm font-medium text-gray-500 border border-black/10 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors'>Beli Lagi</button>
				</div>
			</div>
		</div>
	);
}
