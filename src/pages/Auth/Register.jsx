import { CircleCheckBig, User, Lock, Mail, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BgImage from "../../assets/img-regis.jpg";
import Logo from "../../assets/logo.svg";

function Register() {
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
				<div className='w-1/2 h-full p-30 flex flex-col justify-center items-center'>
					<div className='w-2/3 flex flex-col gap-4 justify-center items-center mb-10'>
						<div className='w-full flex flex-col justify-center items-start mt-4 mb-2'>
							<div className='text-4xl font-bold text-black-100 mb-1'>Buat Akun Baru</div>
							<span className='text-lg text-gray-700 mb-4'>
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
									/>
								</div>
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
									/>
								</div>
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
										type='password'
										name='password'
										id='password'
										placeholder='Minimal 6 karakter'
									/>
									<button>
										<Eye className='w-5 h-5 text-gray-600' />
									</button>
								</div>
							</div>
							<div className='w-full flex flex-col justify-center items-start gap-2 mb-3'>
								<div className='flex justify-between'>
									<label
										htmlFor='password'
										className='text-sm text-black-600'>
										Konfirmasi Kata Sandi
									</label>
								</div>
								<div className='w-full flex flex-row gap-4 items-center border border-gray-300 rounded-xl p-3'>
									<Lock className='w-5 h-5 text-gray-600' />
									<input
										className='w-full outline-none border-none'
										type='password'
										name='password'
										id='password'
										placeholder='Ulangi kata sandi'
									/>
									<button>
										<Eye className='w-5 h-5 text-gray-600' />
									</button>
								</div>
							</div>
							<div className='flex gap-2 items-start justify-center text-md font-md text-gray-600 ml-1 text-justify mb-10'>
								<input
									className='cursor-pointer mt-2'
									type='checkbox'
									name=''
									id=''
								/>
								<label htmlFor=''>Saya Menyetujui Syarat & Ketentuan dan Kebijakan Privasi BeliMudah</label>
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
