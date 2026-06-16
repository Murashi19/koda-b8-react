import { useState } from "react";
import { CreditCard, ChevronRight, Lock } from "lucide-react";
import Item1 from "../../assets/product1.png";
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import ProgressBar from "../../components/ProgressBar";
import Footer from "../../components/Footer";

const paymentMethods = [
	{ id: "bca", icon: "🏦", label: "Virtual Account BCA" },
	{ id: "bni", icon: "🏦", label: "Virtual Account BNI" },
	{ id: "card", icon: "💳", label: "Kartu Kredit / Debit" },
	{ id: "gopay", icon: "📱", label: "GoPay" },
	{ id: "ovo", icon: "📱", label: "OVO" },
	{ id: "dana", icon: "📱", label: "Dana" },
];

export default function CheckoutStep2() {
	const [currentStep] = useState(2);
	const [selectedPayment, setSelectedPayment] = useState("bca");

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
						{/* Left: Payment Methods */}
						<div className='flex-1 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6'>
							{/* Heading */}
							<div className='flex items-center gap-2'>
								<CreditCard
									className='w-5 h-5 text-[#1a73e8]'
									strokeWidth={2}
								/>
								<span className='text-base font-medium text-gray-900'>Metode Pembayaran</span>
							</div>

							{/* Payment Options Grid */}
							<div className='grid grid-cols-3 gap-x-4 gap-y-3'>
								{paymentMethods.map((method) => (
									<label
										key={method.id}
										className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 cursor-pointer transition-colors ${selectedPayment === method.id ? "border-[#1a73e8] bg-blue-50" : "border-black/10 hover:border-gray-300 bg-white"}`}>
										<input
											type='radio'
											name='payment'
											value={method.id}
											checked={selectedPayment === method.id}
											onChange={() => setSelectedPayment(method.id)}
											className='accent-[#1a73e8] w-3.5 h-3.5'
										/>
										<span className='text-lg leading-5'>{method.icon}</span>
										<span className='text-xs font-medium text-gray-900'>{method.label}</span>
									</label>
								))}
							</div>

							{/* Security Notice */}
							<div className='flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3'>
								<Lock
									className='w-3.5 h-3.5 text-[#1a73e8] shrink-0'
									strokeWidth={2}
								/>
								<span className='text-xs font-semibold text-gray-500'>Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak menyimpan data kartu kreditmu.</span>
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
									<span>Lanjut Ke Pembayaran</span>
									<ChevronRight
										className='w-5 h-5'
										strokeWidth={2}
									/>
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
