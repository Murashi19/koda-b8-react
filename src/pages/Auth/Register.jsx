import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../services/validations/registerSchema";
import useLocalStorage from "../../hooks/useLocalStorage";

import { CircleCheckBig, User, Lock, Mail, ArrowRight } from "lucide-react";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import { Link } from "react-router-dom";
import BgImage from "../../assets/img-regis.jpg";
import Logo from "../../assets/logo.svg";

function Register() {
	const navigate = useNavigate();
	const [users, setUsers] = useLocalStorage("users");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(registerSchema),
	});

	function processRegister(e) {
		const data = e;
		const { name, email, password } = data;
		console.log(data);

		const existingUser = users.some((user) => user.email === email);

		if (existingUser) {
			alert("Email sudah terdaftar");
			return;
		}

		const newUser = {
			id: users.length + 1,
			name: name,
			email: email,
			password: password,
			role: "customer",
		};
		setUsers(newUser);

		reset();
		navigate("/auth/login");
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};
	return (
		<>
			<div className='h-screen flex justify-between'>
				<div
					className='w-1/2 h-full p-30 bg-cover bg-center hidden lg:flex flex-col'
					style={{ backgroundImage: `linear-gradient(rgba(20,73,230,0.8),rgba(49,44,133,0.8)), url(${BgImage})` }}>
					<div className='w-140 cursor-pointer'>
						<div className='flex items-center gap-2 text-white text-sm font-semibold'>
							<img
								src={Logo}
								alt='Logo BeliMudah'
								className='w-12 h-12'
							/>
							<span className='flex justify-center items-center font-semibold text-white text-2xl whitespace-nowrap'>BeliMudah</span>
						</div>
					</div>
					<div className='w-md flex flex-col justify-center my-auto mx-0'>
						<div className='text-5xl font-bold text-white mb-10'>Bergabung dengan 500.000+ pelanggan puas</div>

						<div className='w-md h-54 flex flex-col items-start gap-4 text-white text-lg'>
							<div className='flex flex-row gap-4 justify-center items-start'>
								<CircleCheckBig />
								<span className='text-gray-300'>Akses ribuan produk dengan harga terbaik</span>
							</div>

							<div className='flex flex-row gap-4 justify-center items-start'>
								<CircleCheckBig />
								<span className='text-gray-300'>Lacak pesanan secara real-time</span>
							</div>
							<div className='flex flex-row gap-4 justify-center items-start'>
								<CircleCheckBig />
								<span className='text-gray-300'>Simpan wishlist & alamat favorit</span>
							</div>
							<div className='flex flex-row gap-4 justify-center items-start'>
								<CircleCheckBig />
								<span className='text-gray-300'>Dapatkan notifikasi promo eksklusif</span>
							</div>
						</div>
					</div>
					<div className='text-sm text-gray-300 flex justify-start mt-auto'>© 2026 BeliMudah. Seluruh hak cipta dilindungi.</div>
				</div>
				<div className='w-full mx-auto lg:w-1/2 h-full flex flex-col justify-center items-center'>
					<div className='w-2/3 flex flex-col gap-0 lg:gap-2 justify-center items-center mb-1 lg:mb-5'>
						<div className='w-full flex flex-col justify-center items-start mt-4 mb-2'>
							<div className='text-2xl lg:text-4xl font-bold text-black-100 mb-1'>Buat Akun Baru</div>
							<span className='text-md lg:text-lg text-gray-700 mb-4'>
								Sudah punya akun?
								<Link
									className='ml-2 no-underscore text-blue-600'
									to='/auth/login'>
									Masuk di sini
								</Link>
							</span>
						</div>
						<div className='w-full grid-cols-2 flex flex-row gap-2 mb-2'>
							<button
								type='button'
								className='w-full text-sm text-gray-600 rounded-xl border border-black-100 p-2'>
								Daftar via Google
							</button>
							<button
								type='button'
								className='w-full text-sm text-gray-600 rounded-xl border border-black-100 p-2'>
								Daftar via Facebook
							</button>
						</div>
						<div className='w-full flex justify-between items-center text-sm text-gray-600 gap-2'>
							<div className='w-1/2 h-px bg-gray-300'></div>
							<span className='w-full text-sm text-gray-600 text-center'>atau masuk dengan email</span>
							<div className='w-1/2 h-px bg-gray-300'></div>
						</div>

						<form
							id='register-form'
							action=''
							onSubmit={handleSubmit(processRegister)}
							className='w-full flex flex-col justify-center items-start '>
							<div className='w-full flex flex-col justify-center items-start gap-2 mb-3'>
								<label
									htmlFor='name'
									className='text-sm text-black-600'>
									Nama Lengkap
								</label>
								<div className='w-full flex flex-row gap-4 items-center border border-gray-300 rounded-xl p-3'>
									<User className='w-5 h-5 text-gray-600' />
									<input
										className='w-full outline-none border-none'
										type='name'
										name='name'
										id='name'
										placeholder='Nama lengkap kamu'
										{...register("name")}
									/>
								</div>
								{errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
							</div>

							<div className='w-full flex flex-col justify-center items-start gap-2 mb-3'>
								<label
									htmlFor='email'
									className='text-sm text-black-600'>
									Email
								</label>
								<div className='w-full flex flex-row gap-4 items-center border border-gray-300 rounded-xl p-3'>
									<Mail className='w-5 h-5 text-gray-600' />
									<input
										className='w-full outline-none border-none'
										type='email'
										name='email'
										id='email'
										placeholder='email.@contoh.com'
										{...register("email")}
									/>
								</div>
								{errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
							</div>

							<div className='w-full flex flex-col justify-center items-start gap-2 mb-3'>
								<div className='flex justify-between'>
									<label
										htmlFor='password'
										className='text-sm text-black-600'>
										Kata Sandi
									</label>
								</div>
								<div className='w-full flex flex-row gap-4 items-center border border-gray-300 rounded-xl p-3'>
									<Lock className='w-5 h-5 text-gray-600' />
									<input
										className='w-full outline-none border-none'
										type={showPassword ? "text" : "password"}
										name='password'
										id='password'
										placeholder='Minimal 6 karakter'
										{...register("password")}
									/>
									<button
										type='button'
										onClick={togglePasswordVisibility}>
										{showPassword ? <PiEyeBold className='w-5 h-5 text-gray-600 cursor-pointer' /> : <PiEyeClosed className='w-5 h-5 text-gray-600 cursor-pointer' />}
									</button>
								</div>
								{errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
							</div>
							<div className='w-full flex flex-col justify-center items-start gap-2 mb-3'>
								<div className='flex justify-between'>
									<label
										htmlFor='confirmPassword'
										className='text-sm text-black-600'>
										Konfirmasi Kata Sandi
									</label>
								</div>
								<div className='w-full flex flex-row gap-4 items-center border border-gray-300 rounded-xl p-3'>
									<Lock className='w-5 h-5 text-gray-600' />
									<input
										className='w-full outline-none border-none'
										type={showConfirmPassword ? "text" : "password"}
										name='confirmPassword'
										id='confirmPassword'
										placeholder='Ulangi kata sandi'
										{...register("confirmPassword")}
									/>
									<button
										type='button'
										onClick={toggleConfirmPasswordVisibility}>
										{showConfirmPassword ? <PiEyeBold className='w-5 h-5 text-gray-600 cursor-pointer' /> : <PiEyeClosed className='w-5 h-5 text-gray-600 cursor-pointer' />}
									</button>
								</div>
								{errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
							</div>
							<div className='flex gap-2 text-sm lg:text-md font-md text-gray-600 ml-1 text-justify mb-2 lg:mb-10'>
								<input
									className='flex items-center justify-center cursor-pointer'
									type='checkbox'
									name=''
									id=''
								/>
								<label
									className='flex items-center justify-center text-center'
									htmlFor=''>
									Saya Menyetujui Syarat & Ketentuan dan Kebijakan Privasi BeliMudah
								</label>
							</div>
							<div className='w-full flex flex-row justify-center items-center bg-orange-600 rounded-lg p-3 hover:bg-orange-700 mb-5 gap-3'>
								<button
									type='submit'
									className='text-md text-white justify-center items-center font-md border-none mr-4'>
									Daftar Sekarang
								</button>
								<ArrowRight className='w-5 h-5 text-white' />
							</div>
						</form>
						<div className='flex justify-center items-center text-md text-gray-500 mb-1 gap-2'>
							<span className='font-bold flex justify-center items-center'>🔒</span>
							<span>Data kamu aman dan terenkripsi</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
