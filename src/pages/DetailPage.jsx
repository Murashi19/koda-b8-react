import { useState, useContext } from "react";
import { ChevronRight, ShoppingCart, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

// Components
import Header from "../components/Header";
import ButtonMessage from "../components/ButtonMessage";
import Footer from "../components/Footer";
import StarRating from "../components/StarsRate.jsx";
import ProductCard from "../components/ProductCard";

// Context
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";

// Data
import { products } from "../data/products.js";
import category from "../data/category.js";

// Data Delivery
const deliveryInfo = [
	{ icon: Truck, label: "Gratis Ongkir", sub: "Min. Rp 100.000" },
	{ icon: Shield, label: "Pembayaran Aman", sub: "SSL Terenkripsi" },
	{ icon: RefreshCw, label: "Retur 30 Hari", sub: "Gratis retur" },
];

const colorOptions = ["Hitam", "Putih", "Biru"];
const tabs = ["Deskripsi", "Spesifikasi", "Ulasan (2)"];

// Main Page
export default function DetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const product = products.find((p) => String(p.id) === id);

	const { addToCart } = useContext(CartContext);
	const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

	const [selectedColor, setSelectedColor] = useState("Hitam");
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState("Deskripsi");
	const [selectedImg, setSelectedImg] = useState(product?.image);

	// Produk tidak ditemukan (id tidak valid / tidak ada di data)
	if (!product) {
		return (
			<>
				<Header className='fixed' />
				<ButtonMessage />
				<main className='max-w-7xl mx-auto px-4 py-20 text-center'>
					<h1 className='text-2xl font-semibold text-gray-900 mb-4'>Produk tidak ditemukan</h1>
					<button
						type='button'
						onClick={() => navigate("/browse-product")}
						className='px-5 py-2.5 rounded-xl bg-[#1a73e8] hover:bg-blue-500 text-white text-sm font-medium transition-colors'>
						Lihat Semua Produk
					</button>
				</main>
				<Footer />
			</>
		);
	}

	const wishlisted = isWishlisted(product.id);
	const galleryImages = [product.image];

	// Cari slug kategori dari data/category.js (sumber kebenaran yang sama dipakai NavHeader & BrowseMain)
	const productCategory = category.find((cat) => cat.name === product.category);
	const categorySlug = productCategory?.slug ?? "";

	const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

	const handleAddToCart = () => {
		addToCart(product, quantity);
	};

	return (
		<>
			<Header className='fixed' />
			<ButtonMessage />
			<main className='max-w-7xl mx-auto px-4 mb-12'>
				{/* Breadcrumb */}
				<nav className='flex items-center gap-1 text-sm text-gray-500 mt-6 mb-12'>
					{[
						{ label: "Beranda", to: "/" },
						{ label: "Toko", to: "/browse-product" },
						{ label: product.category, to: `/browse-product/${categorySlug}` },
						{ label: product.name, to: "#" },
					].map((item, i, arr) => (
						<span
							key={item.label}
							className='flex items-center gap-1'>
							<Link
								to={item.to}
								className={i === arr.length - 1 ? "text-gray-400 cursor-default pointer-events-none" : "text-gray-600 hover:text-gray-900 transition-colors"}>
								{item.label}
							</Link>
							{i < arr.length - 1 && <ChevronRight className='w-3.5 h-3.5 text-gray-400' />}
						</span>
					))}
				</nav>

				{/* ── Product Layout ── */}
				<div className='flex gap-8'>
					{/* Left: Images */}
					<div className='w-151 shrink-0'>
						{/* Main Image */}
						<div className='relative w-full aspect-square rounded-2xl overflow-hidden'>
							<img
								src={selectedImg}
								alt={product.name}
								className='w-full h-full object-cover'
							/>
							{product.badge && <span className='absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full'>{product.badge}</span>}
						</div>

						{/* Thumbnails */}
						<div className='flex gap-3 mt-3'>
							{galleryImages.map((img, i) => (
								<button
									key={i}
									type='button'
									onClick={() => setSelectedImg(img)}
									className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${selectedImg === img ? "border-[#1a73e8]" : "border-black/10"}`}>
									<img
										src={img}
										alt={`Thumbnail ${i + 1}`}
										className='w-full h-full object-cover'
									/>
								</button>
							))}
						</div>
					</div>

					{/* Right: Detail */}
					<div className='flex-1 flex flex-col gap-4'>
						{/* Name */}
						<div>
							<p className='text-sm text-gray-500 mb-1'>
								{product.brand} · {product.category}
							</p>
							<h1 className='text-2xl font-bold text-gray-900 mb-2'>{product.name}</h1>
							<div className='flex items-center gap-3'>
								<div className='flex items-center gap-1'>
									<StarRating rating={product.rating} />
									<span className='text-base text-gray-500 ml-1'>
										{product.rating} ({product.review})
									</span>
								</div>
								<span className='bg-green-50 text-green-600 text-sm font-medium px-2 py-0.5 rounded'>{product.stock > 0 ? `✓ Stok tersedia (${product.stock})` : "Stok habis"}</span>
							</div>
						</div>

						{/* Price */}
						<div className='bg-blue-50 rounded-xl px-4 py-3'>
							<div className='flex items-center gap-2'>
								<span className='text-[28px] font-bold text-[#1a73e8] leading-10.5'>{product.discountPrice}</span>
								{product.regularPrice && <span className='text-lg text-gray-500 line-through'>{product.regularPrice}</span>}
								{product.badge && <span className='bg-red-600 text-white text-sm px-2.5 py-0.5 rounded-full'>Hemat {product.badge}</span>}
							</div>
						</div>

						{/* Color */}
						<div>
							<p className='text-sm text-gray-900 mb-2'>
								Warna: <span className='text-[#1a73e8]'>{selectedColor}</span>
							</p>
							<div className='flex gap-2'>
								{colorOptions.map((color) => (
									<button
										key={color}
										type='button'
										onClick={() => setSelectedColor(color)}
										className={`h-8.5 px-3 rounded-lg text-sm border transition-colors ${selectedColor === color ? "border-[#1a73e8] bg-blue-50 text-[#1a73e8]" : "border-black/10 text-gray-700 hover:border-gray-300"}`}>
										{color}
									</button>
								))}
							</div>
						</div>

						{/* Quantity */}
						<div>
							<p className='text-sm text-gray-900 mb-2'>Jumlah</p>
							<div className='flex items-center gap-3'>
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
										onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
										className='w-11 h-9.5 text-lg text-gray-800 hover:bg-gray-100 transition-colors'>
										+
									</button>
								</div>
								<span className='text-sm text-gray-500'>Stok: {product.stock} pcs</span>
							</div>
						</div>

						{/* Buttons */}
						<div className='flex items-center gap-3 mt-2'>
							<button
								type='button'
								onClick={handleAddToCart}
								disabled={product.stock === 0}
								className='flex items-center justify-center gap-2 w-67 h-14 rounded-xl border-2 border-orange-500 text-orange-500 text-base font-medium hover:bg-orange-500 hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-orange-500 disabled:cursor-not-allowed'>
								<ShoppingCart
									className='w-4.5 h-4.5'
									strokeWidth={2}
								/>
								Tambah ke Keranjang
							</button>
							<button
								type='button'
								onClick={() => {
									handleAddToCart();
									navigate("/cart");
								}}
								disabled={product.stock === 0}
								className='w-67 h-14 rounded-xl bg-orange-500 border-2 border-orange-500 text-white text-base font-medium hover:bg-white hover:text-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'>
								Beli Sekarang
							</button>
							<button
								type='button'
								onClick={() => toggleWishlist(product)}
								className='w-12 h-14 rounded-xl border-2 border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors'>
								<Heart
									className='w-6 h-6'
									strokeWidth={2}
									stroke={wishlisted ? "#dc2626" : "#6b7280"}
									fill={wishlisted ? "#dc2626" : "none"}
								/>
							</button>
						</div>

						{/* Delivery Cards */}
						<div className='flex gap-2 mt-2'>
							{deliveryInfo.map(({ icon: Icon, label, sub }) => (
								<div
									key={label}
									className='flex-1 flex flex-col items-center text-center border border-black/10 bg-gray-100/50 rounded-lg py-2 px-1'>
									<Icon
										className='w-4 h-4 text-[#1a73e8] mb-1'
										strokeWidth={2}
									/>
									<span className='text-xs text-gray-900 leading-4'>{label}</span>
									<span className='text-xs text-gray-500 leading-4'>{sub}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Description / Tabs */}
				<div className='mt-8 border border-black/10 rounded-xl overflow-hidden'>
					{/* Tab Nav */}
					<div className='flex border-b border-black/10'>
						{tabs.map((tab) => (
							<button
								key={tab}
								type='button'
								onClick={() => setActiveTab(tab)}
								className={`w-28 h-14 text-sm font-medium transition-colors ${activeTab === tab ? "text-[#1a73e8] border-b-2 border-[#1a73e8]" : "text-gray-500 hover:text-gray-700"}`}>
								{tab}
							</button>
						))}
					</div>

					{/* Tab Content */}
					<div className='p-6 text-base text-gray-500 leading-relaxed'>
						{activeTab === "Deskripsi" && <p>Headphone wireless dengan teknologi noise-cancelling terdepan. Nikmati musik favoritmu tanpa gangguan dengan kualitas suara yang memukau.</p>}
						{activeTab === "Spesifikasi" && <p>Spesifikasi produk akan ditampilkan di sini.</p>}
						{activeTab === "Ulasan (2)" && <p>Ulasan pelanggan akan ditampilkan di sini.</p>}
					</div>
				</div>

				{/* ── Related Products ── */}
				<div className='mt-10'>
					<h2 className='text-lg font-medium text-gray-900 mb-5'>Produk Terkait</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
						{relatedProducts.map((p) => (
							<ProductCard
								key={p.id}
								product={p}
							/>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
