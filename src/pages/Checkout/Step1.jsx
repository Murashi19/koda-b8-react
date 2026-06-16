import { useState } from "react";
import { Truck, ChevronRight } from "lucide-react";
import Item1 from "../../assets/product1.png";
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";

// Progress Bar
import ProgressBar from "../../components/ProgressBar";
import Footer from "../../components/Footer";

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
	const [currentStep] = useState(1);
	const [selectedShipping, setSelectedShipping] = useState("same-day");
	const [form, setForm] = useState({
		nama: "",
		telepon: "",
		email: "",
		alamat: "",
		kota: "",
		provinsi: "",
		kodePos: "",
		catatan: "",
	});

	const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
										value={form.nama}
										onChange={handleChange}
										placeholder='Budi Santoso'
										className={inputClass}
									/>
								</div>

								<div>
									<Label required>Nomor Telepon</Label>
									<input
										type='tel'
										name='telepon'
										value={form.telepon}
										onChange={handleChange}
										placeholder='0812-3456-7890'
										className={inputClass}
									/>
								</div>

								<div className='col-span-2'>
									<Label required>Email</Label>
									<input
										type='email'
										name='email'
										value={form.email}
										onChange={handleChange}
										placeholder='budi@email.com'
										className={inputClass}
									/>
								</div>

								<div className='col-span-2'>
									<Label required>Alamat Lengkap</Label>
									<input
										type='text'
										name='alamat'
										value={form.alamat}
										onChange={handleChange}
										placeholder='Jl. Kebon Jeruk No. 15'
										className={inputClass}
									/>
								</div>

								<div>
									<Label required>Kota</Label>
									<input
										type='text'
										name='kota'
										value={form.kota}
										onChange={handleChange}
										placeholder='Jakarta Barat'
										className={inputClass}
									/>
								</div>

								<div>
									<Label required>Provinsi</Label>
									<input
										type='text'
										name='provinsi'
										value={form.provinsi}
										onChange={handleChange}
										placeholder='DKI Jakarta'
										className={inputClass}
									/>
								</div>

								<div>
									<Label required>Kode Pos</Label>
									<input
										type='text'
										name='kodePos'
										value={form.kodePos}
										onChange={handleChange}
										placeholder='11530'
										className={inputClass}
									/>
								</div>

								<div>
									<Label>Catatan (opsional)</Label>
									<textarea
										name='catatan'
										value={form.catatan}
										onChange={handleChange}
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
								className='w-full h-12 rounded-xl bg-[#1a73e8] hover:bg-blue-600 text-white text-base font-medium flex items-center justify-center gap-2 transition-colors'>
								<span>Lanjut Ke Pembayaran</span>
								<ChevronRight
									className='w-5 h-5'
									strokeWidth={2}
								/>
							</button>
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
