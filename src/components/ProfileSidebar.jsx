// src/components/ProfileSidebar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronRight } from "lucide-react";
import { navItems } from "../data/navItemProfile";
import { orders } from "../data/order";
import { initialWishlist } from "../data/wishlist";

function useProfileStats() {
	const [orderCount] = useState(orders.length);
	const [wishlistCount] = useState(initialWishlist.length); // ganti dengan wishlists.length kalau sudah ada datanya

	return { orderCount, wishlistCount };
}

export default function ProfileSidebar({ activeNav }) {
	const navigate = useNavigate();
	const { orderCount, wishlistCount } = useProfileStats();

	const handleNav = (item) => {
		navigate(item.route);
	};

	const handleLogout = () => {
		// TODO: clear auth state / token
		navigate("/auth/login");
	};

	return (
		<div className='col-span-1 flex flex-col gap-4'>
			{/* Avatar card */}
			<div className='flex flex-col items-center gap-3 bg-white border border-black/10 rounded-2xl p-5'>
				<div className='w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center'>
					<span className='text-xl font-bold text-[#1a73e8]'>B</span>
				</div>
				<div className='flex flex-col items-center gap-1'>
					<h2 className='text-base font-semibold text-gray-900'>Budi Santoso</h2>
					<span className='text-xs text-gray-500'>budi@email.com</span>
				</div>
				<div className='w-full flex justify-center gap-6 pt-3 border-t border-black/10'>
					<div className='flex flex-col items-center gap-1'>
						<span className='text-sm font-bold text-gray-900'>{orderCount}</span>
						<span className='text-xs text-gray-500'>Pesanan</span>
					</div>
					<div className='flex flex-col items-center gap-1'>
						<span className='text-sm font-bold text-gray-900'>{wishlistCount}</span>
						<span className='text-xs text-gray-500'>Wishlist</span>
					</div>
				</div>
			</div>

			{/* Nav card */}
			<div className='flex flex-col bg-white border border-black/10 rounded-2xl overflow-hidden'>
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = activeNav === item.id;
					return (
						<button
							key={item.id}
							onClick={() => handleNav(item)}
							className={`flex items-center justify-between gap-3 px-5 py-4 transition-colors cursor-pointer ${isActive ? "bg-blue-50" : "bg-white hover:bg-gray-50"}`}>
							<Icon
								className={`w-4 h-4 shrink-0 ${isActive ? "text-[#1a73e8]" : "text-gray-500"}`}
								strokeWidth={2}
							/>
							<span className={`flex-1 text-left text-base font-normal ${isActive ? "text-[#1a73e8]" : "text-gray-500"}`}>{item.label}</span>
							<ChevronRight
								className={`w-4 h-4 ${isActive ? "text-[#1a73e8]" : "text-gray-500"}`}
								strokeWidth={2}
							/>
						</button>
					);
				})}

				{/* Logout */}
				<button
					onClick={handleLogout}
					className='flex items-center gap-3 px-5 py-4 border-t border-black/10 bg-white hover:bg-red-50 transition-colors cursor-pointer'>
					<LogOut
						className='w-4 h-4 text-red-600 shrink-0'
						strokeWidth={2}
					/>
					<span className='text-base font-normal text-red-600'>Keluar</span>
				</button>
			</div>
		</div>
	);
}
