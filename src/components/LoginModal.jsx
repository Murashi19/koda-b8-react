import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, X } from "lucide-react";
import ModalContext from "../context/ModalContext";

export default function LoginModal() {
	const { modalVisible, hideLoginModal, modalMessage } = useContext(ModalContext);
	const navigate = useNavigate();

	if (!modalVisible) return null;

	const handleLogin = () => {
		hideLoginModal();
		navigate("/auth/login");
	};

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'
			onClick={hideLoginModal}>
			<div
				className='relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col items-center gap-5'
				onClick={(e) => e.stopPropagation()}>
				<button
					type='button'
					onClick={hideLoginModal}
					className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'>
					<X className='w-5 h-5' />
				</button>

				<div className='w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center'>
					<LogIn
						className='w-7 h-7 text-[#1a73e8]'
						strokeWidth={2}
					/>
				</div>

				<div className='flex flex-col items-center gap-1.5 text-center'>
					<h3 className='text-base font-semibold text-gray-900'>Kamu belum login</h3>
					<p className='text-sm text-gray-500 leading-relaxed'>{modalMessage || "Silakan login terlebih dahulu untuk melanjutkan."}</p>
				</div>

				<div className='flex gap-3 w-full'>
					<button
						type='button'
						onClick={hideLoginModal}
						className='flex-1 h-10 rounded-xl border border-black/10 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors'>
						Nanti Saja
					</button>
					<button
						type='button'
						onClick={handleLogin}
						className='flex-1 h-10 rounded-xl bg-[#1a73e8] hover:bg-blue-600 text-white text-sm font-medium transition-colors'>
						Login Sekarang
					</button>
				</div>
			</div>
		</div>
	);
}
