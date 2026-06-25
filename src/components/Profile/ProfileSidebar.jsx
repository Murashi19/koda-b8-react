// src/components/ProfileSidebar.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { navItems } from "../../data/navItem.js";

import AuthContext from "../../context/AuthContext.js";
import useLocalStorage from "../../hooks/useLocalStorage.js";

function useProfileStats() {
	const { auth } = useContext(AuthContext);
	const { wishlist } = useLocalStorage("wishlist");

	const currentUser = auth && auth.isLogin;

	const orderCount = currentUser?.orders?.length ?? 0;
	const wishlistCount = wishlist?.length ?? 0;

	return { orderCount, wishlistCount };
}

export default function ProfileSidebar({ activeNav }) {
	const navigate = useNavigate();
	const { orderCount, wishlistCount } = useProfileStats();
	const { auth, setAuth } = useContext(AuthContext);
	const { users, updateUserById } = useLocalStorage("users");

	const character = auth?.name?.charAt(0).toUpperCase();

	const handleNav = (item) => {
		navigate(item.route);
	};

	const handleLogout = () => {
		const updated = users.map((user) => (user.id === auth.id ? { ...user, isLogin: false } : user));
		updateUserById(updated);
		setAuth(null);
		navigate("/auth/login");
	};

	return (
		<div className='col-span-1 flex flex-col gap-4'>
			{/* Avatar card */}
			<div className='flex flex-col items-center gap-3 bg-white border border-black/10 rounded-2xl p-5'>
				<div className='w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center'>
					<span className='text-xl font-bold text-[#1a73e8]'>{character}</span>
				</div>
				<div className='flex flex-col items-center gap-1'>
					<h2 className='text-base font-semibold text-gray-900'>{auth?.name}</h2>
					<span className='text-xs text-gray-500'>{auth?.email}</span>
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
							<IoChevronForward
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
					<FaSignOutAlt
						className='w-4 h-4 text-red-600 shrink-0'
						strokeWidth={2}
					/>
					<span className='text-base font-normal text-red-600'>Keluar</span>
				</button>
			</div>
		</div>
	);
}
