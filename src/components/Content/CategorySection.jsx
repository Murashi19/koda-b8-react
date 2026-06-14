import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Image
import ImgHero from "../../assets/bg-hero.png";
import ImgFashion from "../../assets/bg-fashion.png";
import ImgHome from "../../assets/bg-home.png";
import ImgBeauty from "../../assets/bg-beauty.png";
import ImgSport from "../../assets/bg-sport.png";
import ImgBook from "../../assets/bg-book.png";

const category = [
	{
		id: 1,
		slug: "elektronik",
		name: "Elektronik",
		image: ImgHero,
		totalProduct: 7,
	},
	{
		id: 2,
		slug: "fashion",
		name: "Fashion",
		image: ImgFashion,
		totalProduct: 5,
	},
	{
		id: 3,
		slug: "rumah-dapur",
		name: "Rumah & Dapur",
		image: ImgHome,
		totalProduct: 4,
	},
	{
		id: 4,
		slug: "kecantikan",
		name: "Kecantikan",
		image: ImgBeauty,
		totalProduct: 2,
	},
	{
		id: 5,
		slug: "olahraga",
		name: "Olahraga",
		image: ImgSport,
		totalProduct: 3,
	},
	{
		id: 6,
		slug: "buku-dan-alat-tulis",
		name: "Buku & Alat Tulis",
		image: ImgBook,
		totalProduct: 2,
	},
];
function CategorySection() {
	return (
		<>
			<section className='py-10'>
				<div className='max-w-7xl mx-auto px-4'>
					{/* Header kategori */}
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-2xl font-semibold text-gray-900'>Belanja Berdasarkan Kategori</h2>
						<Link
							to='#'
							className='flex items-center gap-1 text-sm text-[#1a73e8] hover:underline'>
							Lihat Semua
							<ArrowRight className='w-4 h-4' />
						</Link>
					</div>

					{/* List kategori */}
					<ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
						{category.map(({ id, slug, name, image, totalProduct }) => (
							<li key={id}>
								<Link
									to={`/kategori/${slug}`}
									className='flex flex-col items-center gap-2 bg-white rounded-xl p-4 hover:shadow-md transition-shadow duration-200'>
									<img
										src={image}
										alt={name}
										className='w-16 h-16 object-cover rounded-lg'
									/>
									<span className='text-sm font-medium text-gray-800 text-center'>{name}</span>
									<span className='text-xs text-gray-400'>{totalProduct} Produk</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
}

export default CategorySection;
