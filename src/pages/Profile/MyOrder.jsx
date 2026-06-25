import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { FaShoppingCart } from "react-icons/fa";

// Components
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import Footer from "../../components/Footer";
import OrderCard from "../../components/Profile/OrderCard";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";

import usePagination from "../../hooks/usePagination";

export default function MyOrder() {
	const { auth } = useContext(AuthContext);

	// Ambil semua order dari localStorage, filter hanya milik user ini
	const allOrders = JSON.parse(localStorage.getItem("orders") ?? "[]");
	const userOrders = allOrders.filter((o) => o.userId === auth?.id);

	// Pesanan terbaru ditampilkan paling atas
	const sortedOrders = [...userOrders].reverse();

	const { currentPage, setCurrentPage, totalPages, displayedData } = usePagination(sortedOrders, 3);

	return (
		<>
			<Header />
			<ButtonMessage />
			<main className='min-h-screen max-w-[1728px] mx-auto'>
				<div className='max-w-6xl mx-auto grid grid-cols-4 gap-8 px-4 py-8'>
					<ProfileSidebar activeNav='orders' />

					<div className='col-span-3 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5'>
						<div className='flex items-center justify-between'>
							<h2 className='text-xl font-medium text-gray-900'>Pesanan Saya</h2>
							<span className='text-sm text-gray-400'>{userOrders.length} pesanan</span>
						</div>

						{userOrders.length === 0 ? (
							<div className='flex flex-col items-center justify-center py-16 gap-3 text-gray-400'>
								<FaShoppingCart className='w-12 h-12' />
								<p className='text-sm'>Belum ada pesanan.</p>
							</div>
						) : (
							<>
								{displayedData.map((order) => (
									<OrderCard
										key={order.orderId}
										order={order}
									/>
								))}

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
