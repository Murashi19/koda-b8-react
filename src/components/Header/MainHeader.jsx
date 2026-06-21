import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, User, ShoppingCart, Heart, TextAlignJustify } from "lucide-react";
import { useState, useEffect, useContext } from "react";

import useLocalStorage from "../../hooks/useLocalStorage";

import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import WishlistContext from "../../context/WishlistContext";

import LogoHeader from "../../assets/logo-header.png";

function MainHeader() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const { auth } = useContext(AuthContext);
	const { cart } = useContext(CartContext);
	const { wishlist } = useContext(WishlistContext);
	const [users] = useLocalStorage("users");

	useEffect(() => {
		if (users.length === 0) {
			navigate("/auth/login");
		}
	}, [auth, navigate, users]);

	const handleSearch = (e) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/browse-product?q=${encodeURIComponent(query.trim())}`);
		}
	};

	const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
	const wishlistCount = wishlist.length;

	return (
		<>
			<div className='w-screen max-w-7xl mx-auto flex justify-between py-5 items-center gap-10'>
				{/* LOGO */}
				<Link
					className='w-max flex justify-start items-center cursor-pointer'
					to='/'>
					<img
						className='w-45'
						src={LogoHeader}
						alt='Logo BeliMudah'
					/>
				</Link>

				{/* SEARCH */}
				<div className='w-3/4 justify-start items-center'>
					<div className='w-full'>
						<form
							id='search-bar'
							onSubmit={handleSearch}
							className='w-full flex flex-row justify-start items-center border border-gray-400 rounded-2xl'>
							<input
								className='w-full py-3 px-5 rounded-l-2xl outline-hidden'
								type='text'
								placeholder='Cari produk, merek, kategori...'
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<button
								className='w-max py-3 px-5 bg-blue-500 text-white rounded-r-2xl hover:bg-blue-600 transition-colors'
								type='submit'>
								<Search />
							</button>
						</form>
					</div>
				</div>

				<div className='w-1/4 flex flex-row gap-5 items-center'>
					{/* Notification */}
					<button
						onClick={() => navigate("/")}
						className='relative p-1 hover:text-blue-600 transition-colors cursor-pointer'>
						<Bell className='w-5 h-5' />
					</button>

					{/* User */}
					<button
						onClick={() => navigate("/profile/edit-profile")}
						className='flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer'>
						<User className='w-5 h-5' />
						<span id='user-name'>{auth?.name}</span>
					</button>

					{/* Wishlist */}
					<button
						onClick={() => navigate("/profile/wishlist")}
						className='relative p-1 hover:text-red-500 transition-colors cursor-pointer'>
						<Heart className='w-5 h-5' />
						{wishlistCount > 0 && (
							<span className='absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-medium leading-none'>{wishlistCount > 99 ? "99+" : wishlistCount}</span>
						)}
					</button>

					{/* Cart */}
					<button
						id='cart-icon'
						onClick={() => navigate("/cart")}
						className='relative p-1 hover:text-blue-600 transition-colors cursor-pointer'>
						<ShoppingCart className='w-5 h-5' />
						{cartCount > 0 && (
							<span className='absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-[#1a73e8] text-white text-[10px] font-medium leading-none'>{cartCount > 99 ? "99+" : cartCount}</span>
						)}
					</button>

					{/* Mobile menu — 768px */}
					<button
						id='all-icon'
						className='flex md:hidden p-1 hover:text-blue-600 transition-colors cursor-pointer'>
						<TextAlignJustify className='w-5 h-5' />
					</button>
				</div>
			</div>
		</>
	);
}

export default MainHeader;
