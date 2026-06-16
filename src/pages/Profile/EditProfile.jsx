import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronRight, Camera } from "lucide-react";

// Components
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import Footer from "../../components/Footer";

// Data Nav
import { navItems } from "../../data/navItem";

const inputClass = "w-full rounded-lg border border-black/10 bg-gray-100 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-[#1a73e8] transition-colors";

const labelClass = "text-sm font-medium text-gray-900";

// Main Page
export default function EditProfile() {
	const navigate = useNavigate();
	const [activeNav, setActiveNav] = useState("settings");
	const [form, setForm] = useState({
		nama: "Budi Santoso",
		email: "budi@email.com",
		telepon: "0812-3456-7890",
		tanggalLahir: "",
		jenisKelamin: "",
	});

	const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSave = () => {
		// TODO: submit form to API
		console.log("Saved:", form);
	};

	const handleNav = (item) => {
		setActiveNav(item.id);
		navigate(item.route);
	};

	return (
		<>
			<Header />
			<ButtonMessage />
			<main className='min-h-screen max-w-[1728px] mx-auto'>
				<div className='max-w-6xl mx-auto grid grid-cols-4 gap-8 px-4 py-8'>
					{/* ── Left: Sidebar ── */}
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
									<span className='text-sm font-bold text-gray-900'>2</span>
									<span className='text-xs text-gray-500'>Pesanan</span>
								</div>
								<div className='flex flex-col items-center gap-1'>
									<span className='text-sm font-bold text-gray-900'>0</span>
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
							<button
								onClick={() => navigate("/")}
								className='flex items-center gap-3 px-5 py-4 border-t border-black/10 bg-white hover:bg-red-50 transition-colors cursor-pointer'>
								<LogOut
									className='w-4 h-4 text-red-600 shrink-0'
									strokeWidth={2}
								/>
								<span className='text-base font-normal text-red-600'>Keluar</span>
							</button>
						</div>
					</div>

					{/* ── Right: Edit Profile ── */}
					<div className='col-span-3 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5'>
						{/* Heading */}
						<div className='flex items-center justify-between gap-4'>
							<h2 className='text-2xl font-semibold text-gray-900'>Pengaturan Profile</h2>
							<button
								type='button'
								onClick={handleSave}
								className='border border-[#1a73e8] text-[#1a73e8] text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer'>
								Simpan
							</button>
						</div>

						{/* Form card */}
						<div className='w-full flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-6'>
							{/* Avatar upload */}
							<div className='flex items-center gap-4'>
								<div className='w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center text-2xl font-bold text-[#1a73e8] shrink-0'>B</div>
								<label
									htmlFor='unggah-foto'
									className='flex items-center gap-2 text-sm font-medium text-[#1a73e8] cursor-pointer hover:underline'>
									<Camera
										className='w-4 h-4'
										strokeWidth={2}
									/>
									Ganti Foto Profile
								</label>
								<input
									id='unggah-foto'
									type='file'
									accept='image/*'
									className='hidden'
								/>
							</div>

							{/* Form fields */}
							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Nama Lengkap</label>
								<input
									type='text'
									name='nama'
									value={form.nama}
									onChange={handleChange}
									placeholder='Budi Santoso'
									className={inputClass}
								/>
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Email</label>
								<input
									type='email'
									name='email'
									value={form.email}
									onChange={handleChange}
									placeholder='budi@email.com'
									className={inputClass}
								/>
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Nomor Telepon</label>
								<input
									type='tel'
									name='telepon'
									value={form.telepon}
									onChange={handleChange}
									placeholder='0812-3456-7890'
									className={inputClass}
								/>
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Tanggal Lahir</label>
								<input
									type='date'
									name='tanggalLahir'
									value={form.tanggalLahir}
									onChange={handleChange}
									className={inputClass}
								/>
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Jenis Kelamin</label>
								<select
									name='jenisKelamin'
									value={form.jenisKelamin}
									onChange={handleChange}
									className={inputClass}>
									<option value=''>Pilih jenis kelamin</option>
									<option value='laki-laki'>Laki-laki</option>
									<option value='perempuan'>Perempuan</option>
								</select>
							</div>
						</div>

						{/* Account security */}
						<div className='w-full flex flex-col gap-4 border border-black/10 rounded-lg p-6 bg-white'>
							<h3 className='text-sm font-semibold text-gray-900'>Keamanan Akun</h3>
							<button
								type='button'
								className='text-sm font-medium text-[#1a73e8] text-left hover:underline cursor-pointer bg-transparent border-none'>
								Ubah Kata Sandi
							</button>
							<button
								type='button'
								className='text-sm font-medium text-[#1a73e8] text-left hover:underline cursor-pointer bg-transparent border-none'>
								Aktifkan Verifikasi 2 Langkah
							</button>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
