import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "../../services/validations/editProfileSchema";

import AuthContext from "../../context/AuthContext";

import useLocalStorage from "../../hooks/useLocalStorage";

import { LogOut, ChevronRight, Camera } from "lucide-react";

// Components
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import Footer from "../../components/Footer";

// Data Nav
import { navItems } from "../../data/navItem";
import { orders } from "../../data/order";
import { initialWishlist } from "../../data/wishlist";

const inputClass = "w-full rounded-lg border border-black/10 bg-gray-100 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-[#1a73e8] transition-colors";

const labelClass = "text-sm font-medium text-gray-900";

function useProfileStats() {
	const [orderCount] = useState(orders.length);
	const [wishlistCount] = useState(initialWishlist.length);

	return { orderCount, wishlistCount };
}
// Main Page
export default function EditProfile() {
	const navigate = useNavigate();
	const { auth, setAuth } = useContext(AuthContext);
	const [users, , updateUsers] = useLocalStorage("users");
	const [activeNav, setActiveNav] = useState("settings");
	const { orderCount, wishlistCount } = useProfileStats();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(editProfileSchema),
	});

	useEffect(() => {
		if (auth) {
			reset({
				name: auth.name || "",
				email: auth.email || "",
				telepon: auth.telepon || "",
				tanggalLahir: auth.tanggalLahir || "",
				jenisKelamin: auth.jenisKelamin || "",
			});
		}
	}, [auth, reset]);
	const handleSave = (data) => {
		try {
			const profileData = {
				name: data.name?.trim() || auth.name,
				email: data.email?.trim() || auth.email,
				telepon: data.telepon?.trim(),
				tanggalLahir: data.tanggalLahir,
				jenisKelamin: data.jenisKelamin,
			};

			const updatedUsers = users.map((user) => {
				if (user.email === auth.email) {
					return {
						...user,
						...profileData,
					};
				}

				return user;
			});

			updateUsers(updatedUsers);

			const updatedUser = {
				...auth,
				...profileData,
			};

			localStorage.setItem("profile", JSON.stringify(updatedUser));

			setAuth(updatedUser);

			alert("Profile berhasil diperbarui");
		} catch (error) {
			console.error(error);
			alert("Gagal memperbarui profile");
		}
	};

	const handleNav = (item) => {
		setActiveNav(item.id);
		navigate(item.route);
	};

	const handleLogout = () => {
		setAuth(null);
		navigate("/auth/login");
	};
	const character = auth?.name?.charAt(0).toUpperCase();

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
										<ChevronRight
											className={`w-4 h-4 ${isActive ? "text-[#1a73e8]" : "text-gray-500"}`}
											strokeWidth={2}
										/>
									</button>
								);
							})}
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
						<form
							onSubmit={handleSubmit(handleSave)}
							className='w-full flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-6'>
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
									{...register("foto")}
								/>
								{errors.foto && <span className='text-xs text-red-600'>{errors.foto.message}</span>}
							</div>

							{/* Form fields */}
							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Nama Lengkap</label>
								<input
									type='text'
									name='name'
									placeholder='Budi Santoso'
									className={inputClass}
									{...register("name")}
								/>
								{errors.nama && <span className='text-xs text-red-600'>{errors.nama.message}</span>}
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Email</label>
								<input
									type='email'
									name='email'
									placeholder='budi@email.com'
									className={inputClass}
									{...register("email")}
								/>
								{errors.email && <span className='text-xs text-red-600'>{errors.email.message}</span>}
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Nomor Telepon</label>
								<input
									type='tel'
									name='telepon'
									placeholder='0812-3456-7890'
									className={inputClass}
									{...register("telepon")}
								/>
								{errors.telepon && <span className='text-xs text-red-600'>{errors.telepon.message}</span>}
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Tanggal Lahir</label>
								<input
									type='date'
									name='tanggalLahir'
									className={inputClass}
									{...register("tanggalLahir")}
								/>
								{errors.tanggalLahir && <span className='text-xs text-red-600'>{errors.tanggalLahir.message}</span>}
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className={labelClass}>Jenis Kelamin</label>
								<select
									name='jenisKelamin'
									{...register("jenisKelamin")}
									className={inputClass}>
									<option value=''>Pilih jenis kelamin</option>
									<option value='laki-laki'>Laki-laki</option>
									<option value='perempuan'>Perempuan</option>
								</select>
								{errors.jenisKelamin && <span className='text-xs text-red-600'>{errors.jenisKelamin.message}</span>}
							</div>
						</form>

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
