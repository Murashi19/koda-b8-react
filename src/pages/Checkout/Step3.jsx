import { useState } from "react";
import { CheckCircle, Shield, Lock } from "lucide-react";
import Item1 from "../../assets/product1.png";
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import ProgressBar from "../../components/ProgressBar";
import Footer from "../../components/Footer";

export default function CheckoutStep3() {
	const [currentStep] = useState(3);

	return (
		<>
			<Header />
			<ButtonMessage />
			<main className='min-h-screen max-w-[1728px] mx-auto'>
				<div className='max-w-6xl mx-auto flex flex-col items-center gap-8 px-4 py-8'>
					{/* Progress Bar */}
					<ProgressBar currentStep={currentStep} />

					{/* ── Main Content ── */}
					<div className='flex flex-row items-start gap-8 w-full'>
						{/* Left: Order Confirmation */}
						<div className='flex-1 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-6'>
							{/* Heading */}
							<div className='flex items-center gap-2'>
								<CheckCircle
									className='w-5 h-5 text-[#1a73e8]'
									strokeWidth={2}
								/>
								<span className='text-base font-medium text-gray-900'>Konfirmasi Pesanan</span>
							</div>

							{/* Alamat Pengiriman */}
							<div className='flex flex-col gap-1.5 bg-gray-100/30 rounded-xl p-4'>
								<p className='text-sm font-medium text-gray-900 mb-0.5'>Alamat Pengiriman</p>
								<span className='text-sm text-gray-500'>Budi Santoso · 0812-3456-7890</span>
								<span className='text-sm text-gray-500'>Jl. Kebon Jeruk No. 15, Jakarta Barat, DKI Jakarta 11530</span>
							</div>

							{/* Metode Pengiriman */}
							<div className='flex flex-col gap-1.5 bg-gray-100/30 rounded-xl p-4'>
								<p className='text-sm font-medium text-gray-900 mb-0.5'>Metode Pengiriman</p>
								<span className='text-sm text-gray-500'>JNE Reguler · 3-5 hari kerja</span>
							</div>

							{/* Produk yang Dipesan */}
							<div className='flex flex-col gap-3 bg-gray-100/30 rounded-xl p-4'>
								<p className='text-sm font-medium text-gray-900'>Produk yang Dipesan</p>
								<div className='flex items-center gap-3'>
									<img
										src={Item1}
										alt='Headphone Wireless Premium'
										className='w-12 h-12 rounded-lg object-cover border border-black/10'
									/>
									<div className='flex-1 flex flex-col ml-1'>
										<span className='text-sm font-medium text-gray-900'>Headphone Wireless Premium</span>
										<span className='text-xs text-gray-500'>x1</span>
									</div>
									<span className='text-sm font-normal text-[#1a73e8]'>Rp 450.000</span>
								</div>
							</div>

							{/* Terms Notice */}
							<div className='flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4'>
								<Shield
									className='w-6 h-6 text-[#1a73e8] shrink-0'
									strokeWidth={2}
								/>
								<span className='text-xs text-gray-500'>Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat & Ketentuan kami. Pembayaran baru akan diproses setelah kamu mengkonfirmasi di langkah ini.</span>
							</div>

							{/* Buttons */}
							<div className='flex items-center gap-3'>
								<button
									type='button'
									className='w-24 h-12 border border-black/10 rounded-xl text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors'>
									Kembali
								</button>
								<button
									type='button'
									className='flex-1 h-12 rounded-xl bg-[#1a73e8] hover:bg-blue-600 text-white text-base font-medium flex items-center justify-center gap-2 transition-colors'>
									<Lock
										className='w-5 h-5'
										strokeWidth={2}
									/>
									<span>Bayar Rp 450.000 Sekarang</span>
								</button>
							</div>
						</div>

						{/* Right: Order Summary */}
						<div className='w-80 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5'>
							<h2 className='text-base font-medium text-gray-900'>Ringkasan Pesanan</h2>

							{/* Product */}
							<div className='flex items-center gap-3'>
								<img
									src={Item1}
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
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
