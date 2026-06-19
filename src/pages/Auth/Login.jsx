import { useContext, useState } from "react";

// react-dom
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../services/validations/loginSchema";
import useLocalStorage from "../../hooks/useLocalStorage";

// Context
import AuthContext from "../../context/AuthContext";

// react-icons
import { Lock, Mail, SquareArrowRightEnter } from "lucide-react";
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";

// Images
import BgImage from "../../assets/img-login.jpg";
import Logo from "../../assets/logo.svg";

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [users] = useLocalStorage("users");
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});
	function processLogin(e) {
		const data = e;
		console.log(data);
		console.log(users);

		const existing = users.find((user) => user.email === data.email);

		if (!existing) {
			alert("Email atau password salah");
			return;
		}

		setAuth(existing);

		if (existing.role === "admin") {
			navigate("/admin/dashboard");
			return;
		}

		navigate("/");
	}

	const toggleShowPassword = () => setShowPassword((prev) => !prev);
	return (
		<>
			<div className='h-screen flex justify-between'>
				<div
					className='w-1/2 h-full p-30 bg-cover bg-center flex flex-col'
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
					<div className='w-md flex flex-col justify-center my-auto mx-0 text-white'>
						<div className='text-5xl font-bold  mb-10'>Belanja lebih mudah, hidup lebih praktis</div>
						<div className='flex justify-center items-center text-lg'>Ribuan produk pilihan dengan harga terbaik, pengiriman cepat, dan pembayaran yang aman.</div>

						<div className='flex justify-start items-center gap-10 mt-10 text-2xl'>
							<div className='flex flex-col gap-1'>
								<div className='font-bold'>10rb+</div>
								<span className='text-lg'>Produk</span>
							</div>

							<div className='flex flex-col gap-1'>
								<div className='font-bold'>500rb+</div>
								<span className='text-lg'>Pelanggan</span>
							</div>

							<div className='flex flex-col gap-1'>
								<div className='font-bold'>4.8★</div>
								<span className='text-lg'>Rating</span>
							</div>
						</div>
					</div>
					<div className='text-lg text-gray-300 flex justify-start mt-auto'>© 2026 BeliMudah. Seluruh hak cipta dilindungi.</div>
				</div>
				<div className='w-1/2 h-full p-30 flex flex-col justify-center items-center'>
					<div className='w-2/3 flex flex-col gap-4 justify-center items-center mb-10'>
						<div className='w-full flex flex-col justify-center items-start mt-4 mb-2'>
							<div className='text-4xl font-bold text-black-100 mb-1'>Masuk Akun</div>
							<span className='text-lg text-gray-700 mb-4'>
								Belum punya akun?{" "}
								<Link
									className='ml-2 no-underscore text-blue-600'
									to='/auth/register'>
									Daftar gratis
								</Link>
							</span>
						</div>
						<div className='w-full grid-cols-2 flex flex-row gap-2 mb-2'>
							<button
								type='button'
								className='w-full text-sm text-gray-600 rounded-xl border border-black-100 p-2'>
								Google
							</button>
							<button
								type='button'
								className='w-full text-sm text-gray-600 rounded-xl border border-black-100 p-2'>
								Facebook
							</button>
						</div>
						<div className='w-full flex justify-between items-center text-sm text-gray-600 gap-2'>
							<div className='w-1/2 h-px bg-gray-300'></div>
							<span className='w-full text-sm text-gray-600 text-center'>atau masuk dengan email</span>
							<div className='w-1/2 h-px bg-gray-300'></div>
						</div>

						<form
							id='form-login'
							action=''
							onSubmit={handleSubmit(processLogin)}
							className='w-full flex flex-col justify-center items-start mb-2'>
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
										{...register("email", { required: true })}
									/>
								</div>
								{errors.email && <p className='text-red-600'>{errors.email.message}</p>}
							</div>

							<div className='w-full flex flex-col justify-center items-start gap-2 mb-3'>
								<div className='flex justify-between w-full'>
									<label
										className='flex justify-between text-sm text-black-600'
										htmlFor='password'>
										Kata Sandi
									</label>
									<span className='flex  text-sm text-gray-600'>
										<Link to='/auth/forgot-password'>Lupa kata sandi?</Link>
									</span>
								</div>
								<div className='w-full flex flex-row gap-4 items-center border border-gray-300 rounded-xl p-3'>
									<Lock className='w-5 h-5 text-gray-600' />
									<input
										className='w-full outline-none border-none'
										type={showPassword ? "text" : "password"}
										name='password'
										id='password'
										placeholder='Masukan Kata Sandi'
										{...register("password", { required: true })}
									/>
									<button
										type='button'
										onClick={toggleShowPassword}>
										{showPassword ? <PiEyeBold className='w-5 h-5 text-gray-600' /> : <PiEyeClosed className='w-5 h-5 text-gray-600' />}
									</button>
								</div>
								{errors.password && <p className='text-red-600'>{errors.password.message}</p>}
							</div>
							<div className='flex gap-2 items-start justify-center text-md font-md text-gray-600 ml-1 text-justify mb-8'>
								<input
									className='cursor-pointer mt-2'
									type='checkbox'
									name=''
									id=''
								/>
								<label htmlFor=''>Ingat saya selama 30 hari</label>
							</div>
							<div className='w-full flex flex-row justify-center items-center bg-blue-600 rounded-lg p-3 hover:bg-blue-700 gap-3'>
								<SquareArrowRightEnter className='w-5 h-5 text-white' />
								<button
									className='text-md text-white justify-center items-center font-md border-none'
									type='submit'>
									Masuk
								</button>
							</div>
						</form>
						<div className='flex justify-center items-center text-center text-md text-gray-500 mb-1 gap-2'>
							<span className='font-bold flex justify-center items-center'>🔒</span>
							<span>Login aman dengan enkripsi SSL 256-bitssss</span>
						</div>
						<div className='flex justify-center items-center text-center'>Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
