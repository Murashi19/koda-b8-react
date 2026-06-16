import { useState } from "react";

// Components
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import Footer from "../../components/Footer";
import OrderCard from "../../components/OrderCard";
import ProfileSidebar from "../../components/ProfileSidebar";

// Data order
import { orders } from "../../data/order";

const ORDERS_PER_PAGE = 3;

export default function MyOrder() {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

	// Slice data sesuai halaman aktif
	const paginatedOrders = orders.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE);

	return (
		<>
			<Header />
			<ButtonMessage />
			<main className='min-h-screen max-w-[1728px] mx-auto'>
				<div className='max-w-6xl mx-auto grid grid-cols-4 gap-8 px-4 py-8'>
					{/* Left: Profile Sidebar */}
					<ProfileSidebar activeNav='orders' />

					{/* Right: My Orders */}
					<div className='col-span-3 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5'>
						<div className='flex items-center justify-between'>
							<h2 className='text-xl font-medium text-gray-900'>Pesanan Saya</h2>
							<span className='text-sm text-gray-400'>{orders.length} pesanan</span>
						</div>

						{/* Order List */}
						{paginatedOrders.map((order) => (
							<OrderCard
								key={order.id}
								order={order}
							/>
						))}

						{/* Pagination */}
						{totalPages > 1 && (
							<div className='flex items-center justify-center gap-2 pt-4 border-t border-black/10'>
								{/* Prev */}
								<button
									onClick={() => setCurrentPage((p) => p - 1)}
									disabled={currentPage === 1}
									className='px-3 py-1.5 text-sm rounded-lg border border-black/10 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>
									← Prev
								</button>

								{/* Page Numbers */}
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
									<button
										key={page}
										onClick={() => setCurrentPage(page)}
										className={`w-8 h-8 text-sm rounded-lg transition-colors ${currentPage === page ? "bg-[#1a73e8] text-white font-semibold" : "border border-black/10 text-gray-500 hover:bg-gray-50"}`}>
										{page}
									</button>
								))}

								{/* Next */}
								<button
									onClick={() => setCurrentPage((p) => p + 1)}
									disabled={currentPage === totalPages}
									className='px-3 py-1.5 text-sm rounded-lg border border-black/10 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>
									Next →
								</button>
							</div>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
