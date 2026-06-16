import { CircleCheckBig, Truck, MapPin, Package, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import ButtonMessage from "../../components/ButtonMessage";

const orderStatuses = [
	{
		id: "received",
		icon: (
			<CircleCheckBig
				className='w-4.5 h-4.5 text-green-500'
				strokeWidth={2}
			/>
		),
		iconBg: "bg-green-100",
		label: "Pesanan Diterima",
		sub: "Baru saja",
		done: true,
	},
	{
		id: "packing",
		icon: (
			<Package
				className='w-4.5 h-4.5 text-gray-500'
				strokeWidth={2}
			/>
		),
		iconBg: "bg-gray-200",
		label: "Sedang Dikemas",
		sub: "Estimasi 1-2 jam",
		done: false,
	},
	{
		id: "shipping",
		icon: (
			<Truck
				className='w-4.5 h-4.5 text-gray-500'
				strokeWidth={2}
			/>
		),
		iconBg: "bg-gray-200",
		label: "Dalam Pengiriman",
		sub: "3-5 hari kerja",
		done: false,
	},
	{
		id: "delivered",
		icon: (
			<MapPin
				className='w-4.5 h-4.5 text-gray-500'
				strokeWidth={2}
			/>
		),
		iconBg: "bg-gray-200",
		label: "Terkirim",
		sub: "2-3 Juni 2026",
		done: false,
	},
];

export default function CheckoutSuccess() {
	return (
		<>
			<Header />
			<ButtonMessage />
			<main className='min-h-screen max-w-[1728px] mx-auto'>
				<div className='flex flex-col items-center justify-start gap-8 px-4 py-12'>
					{/* Success Icon */}
					<div className='w-24 h-24 rounded-full bg-green-100 flex items-center justify-center'>
						<CircleCheckBig
							className='w-12 h-12 text-green-500'
							fill='#DCFCE7'
							strokeWidth={2}
						/>
					</div>

					{/* Success Text */}
					<div className='flex flex-col items-center gap-2.5 text-center'>
						<h1 className='text-2xl font-semibold text-gray-900'>Pesanan Berhasil! 🎉</h1>
						<span className='text-base font-normal text-gray-500'>Terimakasih telah berbelanja di BeliMudah. Pesananmu sedang diproses</span>
					</div>

					{/* Card: Order Info */}
					<div className='w-160 flex flex-col gap-4 bg-white border border-black/10 rounded-2xl p-4'>
						{/* Order Number & Total */}
						<div className='flex justify-between items-center'>
							<div className='flex flex-col gap-0.5'>
								<span className='text-sm font-normal text-gray-500'>No. Pesanan</span>
								<span className='text-base font-bold text-[#1a73e8]'>#BM28371132</span>
							</div>
							<div className='flex flex-col items-end gap-0.5'>
								<span className='text-sm font-normal text-gray-500'>Total Pembayaran</span>
								<span className='text-base font-bold text-gray-900'>Rp 450.000</span>
							</div>
						</div>

						{/* Divider */}
						<hr className='border-black/10' />

						{/* Shipping Info */}
						<div className='flex flex-col gap-3'>
							<div className='flex items-start gap-3'>
								<Truck
									className='w-4.5 h-4.5 text-[#1a73e8] shrink-0 mt-0.5'
									strokeWidth={2}
								/>
								<div className='flex flex-col'>
									<span className='text-sm text-gray-900'>JNE Reguler</span>
									<span className='text-xs text-gray-500'>Estimasi tiba: 2-3 Juni 2026</span>
								</div>
							</div>
							<div className='flex items-start gap-3'>
								<MapPin
									className='w-4.5 h-4.5 text-[#1a73e8] shrink-0 mt-0.5'
									strokeWidth={2}
								/>
								<div className='flex flex-col'>
									<span className='text-sm text-gray-900'>Alamat Pengiriman</span>
									<span className='text-xs text-gray-500'>Jl. Kebon Jeruk No. 15, Jakarta Barat, DKI Jakarta 11530</span>
								</div>
							</div>
						</div>
					</div>

					{/* Card: Order Status */}
					<div className='w-160 bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-4'>
						<h2 className='text-lg font-medium text-gray-900'>Status Pesanan</h2>

						<div className='flex flex-col gap-4 w-full'>
							{orderStatuses.map((status) => (
								<div
									key={status.id}
									className='flex items-center gap-4'>
									{/* Icon */}
									<div className={`w-9 h-9 rounded-full ${status.iconBg} flex items-center justify-center shrink-0`}>{status.icon}</div>
									{/* Label */}
									<div className='flex-1 flex flex-col'>
										<span className={`text-sm font-normal ${status.done ? "text-gray-900" : "text-gray-500"}`}>{status.label}</span>
										<span className='text-xs text-gray-500'>{status.sub}</span>
									</div>
									{/* Checkmark badge for done */}
									{status.done && <span className='text-xs text-green-600 bg-green-50 rounded-full px-2 py-0.5'>✓</span>}
								</div>
							))}
						</div>
					</div>

					{/* Action Buttons */}
					<div className='w-160 flex items-center gap-3'>
						<button
							type='button'
							className='h-12.5 rounded-xl px-6 bg-[#1a73e8] hover:bg-blue-600 text-white text-base font-medium flex items-center justify-center gap-2 transition-colors'>
							<Package
								className='w-4 h-4'
								strokeWidth={2}
							/>
							<span>Lacak Pesanan</span>
						</button>
						<button
							type='button'
							className='h-12.5 rounded-xl px-6 border border-[#1a73e8] text-gray-500 text-base font-medium flex items-center justify-center hover:bg-blue-50 transition-colors'>
							Lihat Riwayat Pesanan
						</button>
						<button
							type='button'
							className='h-12.5 rounded-xl px-6 text-[#1a73e8] text-base font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors'>
							<span>Lanjut Belanja</span>
							<ArrowRight
								className='w-4.5 h-4.5'
								strokeWidth={2}
							/>
						</button>
					</div>
				</div>
			</main>
		</>
	);
}
