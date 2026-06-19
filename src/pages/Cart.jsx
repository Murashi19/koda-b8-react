import { useState } from "react";
import { Trash2, Heart, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Data
import { products } from "../data/products.js";

// Components
import Header from "../components/Header";
import ButtonMessage from "../components/ButtonMessage";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

// Images
import Item1 from "../assets/product1.png";

// Main Page
export default function CartPage() {
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState(1);
	const [voucher, setVoucher] = useState("");
	const [savedToWishlist, setSavedToWishlist] = useState(false);
	const [relatedWishlisted, setRelatedWishlisted] = useState({});

	const toggleRelated = (id) => setRelatedWishlisted((prev) => ({ ...prev, [id]: !prev[id] }));

	const itemPrice = 450000;
	const total = itemPrice * quantity;

	const formatRp = (n) => "Rp " + n.toLocaleString("id-ID").replace(/\./g, ".");

	const relatedProducts = products.slice(0, 4);

	return (
		<>
			<Header className='fixed' />
			<ButtonMessage />
			<main className='max-w-7xl mx-auto px-4 mt-10 mb-12'>
				{/* Heading */}
				<h1 className='text-2xl font-medium text-gray-900 leading-9 mb-5'>Keranjang Belanja ({quantity} item)</h1>

				{/* ── Main Grid ── */}
				<div className='grid grid-cols-[1fr_394px] gap-4 items-start'>
					{/* Left Column */}
					<div className='flex flex-col gap-4'>
						{/* Card Item */}
						<div className='bg-white border border-black/10 rounded-2xl p-4'>
							<div className='flex gap-4'>
								{/* Product Image */}
								<div className='w-24 h-24 rounded-xl overflow-hidden shrink-0'>
									<img
										src={Item1}
										alt='Headphone Wireless Premium'
										className='w-full h-full object-cover'
									/>
								</div>

								{/* Product Info */}
								<div className='flex-1 flex flex-col gap-1.5'>
									{/* Title + Delete */}
									<div className='flex items-start justify-between'>
										<span className='text-base font-medium text-gray-900 leading-6'>Headphone Wireless Premium</span>
										<button
											type='button'
											aria-label='Hapus item'
											className='text-gray-600 hover:text-red-500 transition-colors'>
											<Trash2
												className='w-4 h-4'
												strokeWidth={2}
											/>
										</button>
									</div>

									{/* Color */}
									<p className='text-xs text-gray-500'>Hitam</p>

									{/* Quantity + Price */}
									<div className='flex items-center justify-between'>
										<div className='flex items-center border border-black/10 rounded-xl overflow-hidden w-37.5'>
											<button
												type='button'
												onClick={() => setQuantity((q) => Math.max(1, q - 1))}
												className='w-11 h-9.5 text-lg text-gray-800 hover:bg-gray-100 transition-colors'>
												−
											</button>
											<input
												type='number'
												value={quantity}
												readOnly
												className='w-13.5 h-9.5 text-center text-base border-x border-black/10 bg-transparent outline-none text-gray-900'
											/>
											<button
												type='button'
												onClick={() => setQuantity((q) => q + 1)}
												className='w-11 h-9.5 text-lg text-gray-800 hover:bg-gray-100 transition-colors'>
												+
											</button>
										</div>
										<span className='text-base text-[#1a73e8]'>{formatRp(itemPrice * quantity)}</span>
									</div>

									{/* Save to Wishlist */}
									<button
										type='button'
										onClick={() => setSavedToWishlist((v) => !v)}
										className='flex items-center gap-1.5 w-fit text-xs text-gray-500 hover:text-gray-700 transition-colors'>
										<Heart
											className='w-3 h-3'
											strokeWidth={3}
											stroke={savedToWishlist ? "#dc2626" : "gray"}
											fill={savedToWishlist ? "#dc2626" : "white"}
										/>
										<span>{savedToWishlist ? "Tersimpan di Wishlist" : "Simpan ke Wishlist"}</span>
									</button>
								</div>
							</div>
						</div>

						{/* Card Voucher */}
						<div className='bg-white border border-black/10 rounded-2xl p-4'>
							<div className='flex items-center gap-1.5 mb-3'>
								<span className='text-base'>🏷️</span>
								<span className='text-sm font-medium text-gray-900'>Kode Promo</span>
							</div>
							<div className='flex gap-2 mb-3'>
								<input
									type='text'
									value={voucher}
									onChange={(e) => setVoucher(e.target.value)}
									placeholder='Masukkan Kode Promo'
									className='flex-1 h-10.5 rounded-xl border border-black/10 bg-gray-100 px-4 text-sm outline-none focus:border-[#1a73e8] transition-colors'
								/>
								<button
									type='button'
									className='w-25.75 h-10.5 rounded-xl bg-[#1a73e8] hover:bg-blue-500 text-white text-sm font-medium transition-colors'>
									Terapkan
								</button>
							</div>
							<p className='text-xs text-gray-500'>Coba: HEMAT10, BELIMUDAH, atau NEWUSER</p>
						</div>
					</div>

					{/* Right Column: Order Summary */}
					<div className='bg-white border border-black/10 rounded-2xl p-5 flex flex-col gap-4'>
						<h2 className='text-lg font-medium text-gray-900'>Ringkasan Pesanan</h2>

						<div className='flex flex-col gap-3'>
							<div className='flex justify-between text-sm text-gray-500'>
								<span>Subtotal ({quantity} item)</span>
								<span>{formatRp(total)}</span>
							</div>
							<div className='flex justify-between text-sm text-gray-500'>
								<span>Ongkos Kirim</span>
								<span className='text-green-600 font-medium'>GRATIS</span>
							</div>
							<hr className='border-black/10' />
							<div className='flex justify-between text-sm font-medium text-gray-900'>
								<span>Total</span>
								<span className='text-[#1a73e8] font-semibold text-base'>{formatRp(total)}</span>
							</div>
						</div>

						{/* Checkout Button */}
						<button
							type='button'
							onClick={() => {
								navigate("/checkout/step1");
							}}
							className='w-full h-13 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-base font-medium flex items-center justify-center gap-2 transition-colors'>
							<Shield
								className='w-3.25 h-4'
								strokeWidth={2}
							/>
							<span>Checkout Aman</span>
						</button>

						{/* Payment Info */}
						<div className='text-xs text-gray-500 text-center flex flex-col gap-1'>
							<p>🔒 Pembayaran 100% Aman</p>
							<p>Metode: Transfer Bank · Virtual Account · Kartu Kredit · e-Wallet</p>
						</div>
					</div>
				</div>

				{/* ── Related Products ── */}
				<div className='mt-10'>
					<h2 className='text-lg font-medium text-gray-900 mb-5'>Mungkin Kamu Suka Ini</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
						{relatedProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								wishlisted={relatedWishlisted[product.id]}
								onToggle={toggleRelated}
							/>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
