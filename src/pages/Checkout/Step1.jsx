import { useState } from "react";
import { Truck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Shipping Methods
const shippingOptions = [
	{ id: "jne-reg", label: "JNE Reguler", sub: "3 - 5 hari kerja", price: "GRATIS" },
	{ id: "jne-exp", label: "JNE Express", sub: "1 - 2 hari kerja", price: "GRATIS" },
	{ id: "same-day", label: "Same Day Delivery", sub: "Hari ini (sebelum 16.00)", price: "GRATIS" },
];

// Form Fields
const inputClass = "w-full h-11 rounded-xl border border-black/10 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-[#1a73e8] transition-colors placeholder:text-gray-400";

const textareaClass = "w-full rounded-xl border border-black/10 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#1a73e8] transition-colors placeholder:text-gray-400 resize-none h-20";

function Label({ children, required }) {
	return (
		<label className='block text-sm font-medium text-gray-700 mb-1.5'>
			{children}
			{required && <span className='text-red-500 ml-0.5'>*</span>}
		</label>
	);
}

// Main Page
export default function CheckoutStep1() {
	const navigate = useNavigate();
	const [selectedShipping, setSelectedShipping] = useState("same-day");

	return (
		<>
			{/* Left: Delivery Form */}
			<div className='flex-1 flex flex-col gap-6 bg-white border border-black/10 rounded-2xl p-6'>
				{/* Heading */}
				<div className='flex items-center gap-2'>
					<Truck
						className='w-5 h-5 text-[#1a73e8]'
						strokeWidth={2}
					/>
					<span className='text-base font-medium text-gray-900'>Alamat Pengiriman</span>
				</div>

				{/* Form */}
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<Label required>Nama Penerima</Label>
						<input
							type='text'
							name='nama'
							placeholder='Budi Santoso'
							className={inputClass}
						/>
					</div>

					<div>
						<Label required>Nomor Telepon</Label>
						<input
							type='tel'
							name='telepon'
							placeholder='0812-3456-7890'
							className={inputClass}
						/>
					</div>

					<div className='col-span-2'>
						<Label required>Email</Label>
						<input
							type='email'
							name='email'
							placeholder='budi@email.com'
							className={inputClass}
						/>
					</div>

					<div className='col-span-2'>
						<Label required>Alamat Lengkap</Label>
						<input
							type='text'
							name='alamat'
							placeholder='Jl. Kebon Jeruk No. 15'
							className={inputClass}
						/>
					</div>

					<div>
						<Label required>Kota</Label>
						<input
							type='text'
							name='kota'
							placeholder='Jakarta Barat'
							className={inputClass}
						/>
					</div>

					<div>
						<Label required>Provinsi</Label>
						<input
							type='text'
							name='provinsi'
							placeholder='DKI Jakarta'
							className={inputClass}
						/>
					</div>

					<div>
						<Label required>Kode Pos</Label>
						<input
							type='text'
							name='kodePos'
							placeholder='11530'
							className={inputClass}
						/>
					</div>

					<div>
						<Label>Catatan (opsional)</Label>
						<textarea
							name='catatan'
							placeholder='Warna pagar, dll.'
							className={textareaClass}
						/>
					</div>
				</div>

				{/* Shipping Methods */}
				<div className='flex flex-col gap-3'>
					<h3 className='text-base font-medium text-gray-900'>Metode Pengiriman</h3>
					{shippingOptions.map((opt) => (
						<label
							key={opt.id}
							className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selectedShipping === opt.id ? "border-[#1a73e8] bg-blue-50" : "border-black/10 hover:border-gray-300"}`}>
							<input
								type='radio'
								name='shipping'
								value={opt.id}
								checked={selectedShipping === opt.id}
								onChange={() => setSelectedShipping(opt.id)}
								className='accent-[#1a73e8]'
							/>
							<div className='flex flex-col flex-1'>
								<span className='text-sm font-medium text-gray-900'>{opt.label}</span>
								<span className='text-xs text-gray-500'>{opt.sub}</span>
							</div>
							<span className='text-sm font-medium text-green-600'>{opt.price}</span>
						</label>
					))}
				</div>

				{/* Continue Button */}
				<button
					type='button'
					onClick={() => navigate("/checkout/step2")}
					className='w-full h-12 rounded-xl bg-[#1a73e8] hover:bg-blue-600 text-white text-base font-medium flex items-center justify-center gap-2 transition-colors'>
					<span>Lanjut Ke Pembayaran</span>
					<ChevronRight
						className='w-5 h-5'
						strokeWidth={2}
					/>
				</button>
			</div>
		</>
	);
}
