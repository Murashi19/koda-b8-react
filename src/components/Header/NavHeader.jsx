import { TextAlignJustify, ChevronDown, Monitor, Shirt, House, SportShoe, Book, WandSparkles } from "lucide-react";
// import Link from "react-router-dom";

function NavHeader() {
	return (
		<>
			<nav className='w-full max-w-7xl flex justify-start items-center mx-auto py-3'>
				<div className=' flex justify-between items-center'>
					<ul className='flex flex-row gap-10 list-none text-gray-600 text-base cursor-pointer '>
						<li className='flex justify-between items-center text-black font-semibold text-lg gap-2'>
							<TextAlignJustify />
							<span>Semua Kategori</span>
							<ChevronDown />
						</li>

						<li className='flex justify-between items-center gap-2'>
							<Monitor />
							<span>Elektronik</span>
						</li>

						<li className='flex justify-between items-center gap-2'>
							<Shirt />
							<span>Fashion</span>
						</li>

						<li className='flex justify-between items-center gap-2'>
							<House />
							<span>Rumah &amp; Dapur</span>
						</li>

						<li className='flex justify-between items-center gap-2'>
							<WandSparkles />
							<span>Kecantikan</span>
						</li>

						<li className='flex items-center gap-2'>
							<SportShoe />
							<span>Olahraga</span>
						</li>

						<li className='flex items-center gap-2'>
							<Book />
							<span>Buku &amp; Alat Tulis</span>
						</li>

						<li className='flex items-center text-red-600 font-bold'>
							<span>🔥 Promo</span>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}

export default NavHeader;
