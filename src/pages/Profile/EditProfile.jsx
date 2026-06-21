import { useEffect, useContext } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "../../services/validations/editProfileSchema";

import AuthContext from "../../context/AuthContext";

import useLocalStorage from "../../hooks/useLocalStorage";

import { Camera } from "lucide-react";

// Components
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";
import Footer from "../../components/Footer";
import ProfileSidebar from "../../components/ProfileSidebar";

const inputClass = "w-full rounded-lg border border-black/10 bg-gray-100 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-[#1a73e8] transition-colors";

const labelClass = "text-sm font-medium text-gray-900";

// Main Page
export default function EditProfile() {
	const { auth, setAuth } = useContext(AuthContext);
	const [users, , updateUsers] = useLocalStorage("users");

	// Cari data user yang sedang login langsung dari "users" (sumber data utama),
	// bukan dari auth, supaya form selalu menampilkan data ter-update di "users"
	const currentUser = users.find((user) => user.email === auth?.email);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(editProfileSchema),
	});

	useEffect(() => {
		if (currentUser) {
			reset({
				name: currentUser.name || "",
				email: currentUser.email || "",
				telepon: currentUser.telepon || "",
				tanggalLahir: currentUser.tanggalLahir || "",
				jenisKelamin: currentUser.jenisKelamin || "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.email, reset]);

	const handleSave = (data) => {
		try {
			const profileData = {
				name: data.name?.trim() || currentUser.name,
				email: data.email?.trim() || currentUser.email,
				telepon: data.telepon?.trim(),
				tanggalLahir: data.tanggalLahir,
				jenisKelamin: data.jenisKelamin,
			};

			// Satu-satunya sumber data: key "users". Tidak ada key "profile" terpisah.
			const updatedUsers = users.map((user) => {
				if (user.email === currentUser.email) {
					return {
						...user,
						...profileData,
					};
				}

				return user;
			});

			updateUsers(updatedUsers);

			const updatedUser = {
				...currentUser,
				...profileData,
			};

			setAuth(updatedUser);

			alert("Profile berhasil diperbarui");
		} catch (error) {
			console.error(error);
			alert("Gagal memperbarui profile");
		}
	};

	const character = currentUser?.name?.charAt(0).toUpperCase();

	return (
		<>
			<Header />
			<ButtonMessage />
			<main className='min-h-screen max-w-[1728px] mx-auto'>
				<div className='max-w-6xl mx-auto grid grid-cols-4 gap-8 px-4 py-8'>
					{/* ── Left: Sidebar ── */}
					<ProfileSidebar activeNav='settings' />

					{/* ── Right: Edit Profile ── */}
					<div className='col-span-3 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-5'>
						{/* Heading */}
						<div className='flex items-center justify-between gap-4'>
							<h2 className='text-2xl font-semibold text-gray-900'>Pengaturan Profile</h2>
							<button
								type='submit'
								form='edit-profile-form'
								className='border border-[#1a73e8] text-[#1a73e8] text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer'>
								Simpan
							</button>
						</div>

						{/* Form card */}
						<form
							id='edit-profile-form'
							onSubmit={handleSubmit(handleSave)}
							className='w-full flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-6'>
							{/* Avatar upload */}
							<div className='flex items-center gap-4'>
								<div className='w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center text-2xl font-bold text-[#1a73e8] shrink-0'>{character}</div>
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
								{errors.name && <span className='text-xs text-red-600'>{errors.name.message}</span>}
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
