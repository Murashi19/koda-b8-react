import { Link } from "react-router-dom";
import { Search, Bell, User, ShoppingCart, Heart, TextAlignJustify } from "lucide-react";

import LogoHeader from "../../assets/logo-header.png";

function MainHeader() {
	return (
		<>
			<div className='w-screen flex justify-between py-5 px-50 items-center gap-10'>
				{/* <!-- LOGO --> */}
				<div className='w-max flex justify-start items-center cursor-pointer'>
					<img
						className='w-45'
						src={LogoHeader}
						alt='Logo BeliMudah'
					/>
					<Link to='/' />
				</div>

				{/* <!-- SEARCH --> */}
				<div className='w-3/4 justify-start items-center'>
					<div className='w-full'>
						<form
							id='search-bar'
							action=''
							method='get'
							className='w-full flex flex-row justify-start items-center border border-gray-400 rounded-2xl '>
							<input
								className='w-full py-3 px-5 rounded-l-2xl outline-hidden '
								type='text'
								placeholder='Cari produk, merek, kategori...'
							/>
							<button
								className='w-max py-3 px-5 bg-blue-500 text-white rounded-r-2xl'
								type='submit'>
								<Search />
							</button>
						</form>
					</div>
				</div>

				<div className='w-1/4 flex flex-row gap-5'>
					{/* <!-- Notification --> */}
					<div className='icon-items notification-icon'>
						<Bell />
					</div>

					{/* <!-- User --> */}
					<div className='flex items-center gap-2'>
						{/* <!-- icon --> */}
						<User />
						<span id='user-name'>Guest</span>
					</div>

					{/* <!-- Wishlist --> */}
					<div className='icon-items wishlist-icon'>
						{/* <!-- icon --> */}
						<Heart />
					</div>

					{/* <!-- Cart --> */}
					<div
						id='cart-icon'
						className='icon-items cart-icon'>
						{/* <!-- icon --> */}
						<ShoppingCart />
					</div>

					{/* <!-- 768px screen --> */}
					<div
						id='all-icon'
						className='flex md:hidden'>
						{/* <!-- icon --> */}
						<TextAlignJustify />
					</div>
				</div>
			</div>
		</>
	);
}

export default MainHeader;
