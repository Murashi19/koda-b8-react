import products from "../data/products";

export default function OrderSummary() {
	return (
		<>
			<div className='w-80 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5'>
				<h2 className='text-base font-medium text-gray-900'>Ringkasan Pesanan</h2>

				{/* Product */}
				<div className='flex items-center gap-3'>
					<img
						src={products[0].image}
						alt='Headphone Wireless Premium'
						className='w-14 h-14 rounded-xl object-cover border border-black/10'
					/>
					<div className='flex-1'>
						<p className='text-sm font-medium text-gray-900 leading-snug'>Headphone Wireless Premium</p>
						<p className='text-xs text-gray-500 mt-0.5'>x1</p>
					</div>
				</div>

				<hr className='border-black/10' />

				{/* Price Breakdown */}
				<div className='flex flex-col gap-2.5'>
					<div className='flex justify-between text-sm text-gray-500'>
						<span>Subtotal</span>
						<span>Rp 450.000</span>
					</div>
					<div className='flex justify-between text-sm text-gray-500'>
						<span>Ongkir</span>
						<span className='text-green-600 font-medium'>GRATIS</span>
					</div>
					<hr className='border-black/10' />
					<div className='flex justify-between text-sm font-semibold text-gray-900'>
						<span>Total</span>
						<span className='text-[#1a73e8]'>Rp 450.000</span>
					</div>
				</div>

				{/* Security Note */}
				<p className='text-xs text-gray-500 text-center'>🔒 Pembayaran aman dan terenkripsi</p>
			</div>
		</>
	);
}
