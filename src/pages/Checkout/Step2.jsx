import { useState } from "react";
import { CreditCard, ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const paymentMethods = [
	{ id: "bca", icon: "🏦", label: "Virtual Account BCA" },
	{ id: "bni", icon: "🏦", label: "Virtual Account BNI" },
	{ id: "card", icon: "💳", label: "Kartu Kredit / Debit" },
	{ id: "gopay", icon: "📱", label: "GoPay" },
	{ id: "ovo", icon: "📱", label: "OVO" },
	{ id: "dana", icon: "📱", label: "Dana" },
];

export default function CheckoutStep2() {
	const navigate = useNavigate();
	const [selectedPayment, setSelectedPayment] = useState("bca");

	return (
		<>
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
						onClick={() => navigate("/checkout/step1")}
						className='w-24 h-12 border border-black/10 rounded-xl text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors'>
						Kembali
					</button>
					<button
						type='button'
						onClick={() => navigate("/checkout/step3")}
						className='flex-1 h-12 rounded-xl bg-[#1a73e8] hover:bg-blue-600 text-white text-base font-medium flex items-center justify-center gap-2 transition-colors'>
						<span>Lanjut Ke Pembayaran</span>
						<ChevronRight
							className='w-5 h-5'
							strokeWidth={2}
						/>
					</button>
				</div>
			</div>
		</>
	);
}
