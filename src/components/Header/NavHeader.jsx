import { Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineComputer, MdOutlineCheckroom, MdOutlineKitchen, MdOutlineMenuBook } from "react-icons/md";
import { PiSparkle } from "react-icons/pi";
import { IoFootballOutline } from "react-icons/io5";

import category from "../../data/category";

const categoryIcons = {
	elektronik: MdOutlineComputer,
	fashion: MdOutlineCheckroom,
	"rumah-dapur": MdOutlineKitchen,
	kecantikan: PiSparkle,
	olahraga: IoFootballOutline,
	"buku-dan-alat-tulis": MdOutlineMenuBook,
};

function NavHeader() {
	return (
		<nav className='w-full max-w-7xl mx-auto py-3'>
			<ul className='flex items-center gap-10 text-gray-600 text-base'>
				<Link
					to='/browse-product'
					className='flex items-center gap-2 text-black font-semibold text-lg'>
					<HiOutlineBars3 />
					<span>Semua Kategori</span>
					<IoChevronDownOutline />
				</Link>

				{category.map((item) => {
					const Icon = categoryIcons[item.slug];

					return (
						<li key={item.id}>
							<Link
								to={`/browse-product/${item.slug}`}
								className='flex items-center gap-2 hover:text-blue-500 transition-colors'>
								{Icon && <Icon size={20} />}
								<span>{item.name}</span>
							</Link>
						</li>
					);
				})}

				<li>
					<Link
						to='/browse-product'
						className='text-red-600 font-bold hover:text-red-700'>
						🔥 Promo
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavHeader;
