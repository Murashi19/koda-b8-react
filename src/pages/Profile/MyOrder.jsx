// Components
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import Footer from "../../components/Footer";
import OrderCard from "../../components/OrderCard";
import ProfileSidebar from "../../components/ProfileSidebar";

import usePagination from "../../hooks/usePagination";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function MyOrder() {
	const [orders] = useLocalStorage("orders");

	// Pesanan terbaru ditampilkan paling atas
	const sortedOrders = [...orders].reverse();

	const { currentPage, setCurrentPage, totalPages, displayedData } = usePagination(sortedOrders, 3);

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

						{orders.length === 0 ? (
							<div className='flex flex-col items-center justify-center py-16 gap-3 text-gray-400'>
								<p className='text-sm'>Belum ada pesanan.</p>
							</div>
						) : (
							<>
								{/* Order List */}
								{displayedData.map((order) => (
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
							</>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
