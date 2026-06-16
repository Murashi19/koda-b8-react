import { useState } from "react";
import { Heart } from "lucide-react";

// Components
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import ProfileSidebar from "../../components/ProfileSidebar";

// Wishlist Data
import { initialWishlist } from "../../data/wishlist";

const ITEMS_PER_PAGE = 6; // kelipatan 3 biar grid cols-3 nya rapi

export default function Wishlist() {
	const [wishlistedIds, setWishlistedIds] = useState(initialWishlist.map((p) => p.id));
	const [products, setProducts] = useState(initialWishlist);
	const [currentPage, setCurrentPage] = useState(1);

	const handleToggle = (id) => {
		const updatedProducts = products.filter((p) => p.id !== id);
		setWishlistedIds((prev) => prev.filter((wid) => wid !== id));
		setProducts(updatedProducts);

		// Kalau halaman aktif jadi kosong setelah hapus, mundur satu halaman
		const newTotalPages = Math.ceil(updatedProducts.length / ITEMS_PER_PAGE);
		if (currentPage > newTotalPages && newTotalPages > 0) {
			setCurrentPage(newTotalPages);
		}
	};

	const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
	const paginatedProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	return (
		<>
			<Header />
			<ButtonMessage />
			<main className='min-h-screen max-w-[1728px] mx-auto'>
				<div className='max-w-6xl mx-auto grid grid-cols-4 gap-8 px-4 py-8'>
					{/* Left: Profile Sidebar */}
					<ProfileSidebar activeNav='wishlist' />

					{/* Right: Wishlist */}
					<div className='col-span-3 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5'>
						<h2 className='text-xl font-medium text-gray-900'>Wishlist ({products.length})</h2>

						{products.length === 0 ? (
							<div className='flex flex-col items-center justify-center py-16 gap-3 text-gray-400'>
								<Heart
									className='w-12 h-12'
									strokeWidth={1}
								/>
								<p className='text-sm'>Belum ada produk di wishlist kamu.</p>
							</div>
						) : (
							<>
								{/* Product Grid */}
								<div className='grid grid-cols-3 gap-4'>
									{paginatedProducts.map((product) => (
										<ProductCard
											key={product.id}
											product={product}
											wishlisted={wishlistedIds.includes(product.id)}
											onToggle={handleToggle}
										/>
									))}
								</div>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className='flex items-center justify-center gap-2 pt-4 border-t border-black/10'>
										<button
											onClick={() => setCurrentPage((p) => p - 1)}
											disabled={currentPage === 1}
											className='px-3 py-1.5 text-sm rounded-lg border border-black/10 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>
											← Prev
										</button>

										{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
											<button
												key={page}
												onClick={() => setCurrentPage(page)}
												className={`w-8 h-8 text-sm rounded-lg transition-colors ${currentPage === page ? "bg-[#1a73e8] text-white font-semibold" : "border border-black/10 text-gray-500 hover:bg-gray-50"}`}>
												{page}
											</button>
										))}

										<button
											onClick={() => setCurrentPage((p) => p + 1)}
											disabled={currentPage === totalPages}
											className='px-3 py-1.5 text-sm rounded-lg border border-black/10 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>
											Next →
										</button>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
